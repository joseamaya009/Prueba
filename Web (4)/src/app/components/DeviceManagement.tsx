import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Slider } from './ui/slider';
import {
  Droplets,
  Plus,
  Wifi,
  WifiOff,
  Battery,
  MapPin,
  Settings,
  Trash2,
  Activity,
  Signal
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner@2.0.3';

interface DeviceManagementProps {
  userRole: 'admin' | 'technician' | 'user';
}

interface Home {
  id: number;
  name: string;
}

interface HomeMember {
  id: number;
  homeId: number;
  userId: number;
  role: 'admin' | 'member';
}

export function DeviceManagement({ userRole }: DeviceManagementProps) {
  const { t } = useTranslation();

  // Usuario actual (simulando sesión)
  const CURRENT_USER_ID = 1;

  // Datos de hogares (simplificados)
  const [homes] = useState<Home[]>([
    { id: 1, name: 'Casa Principal' },
    { id: 2, name: 'Apartamento Centro' },
    { id: 3, name: 'Apartamento Arrendado Norte' }
  ]);

  // Membresías de hogares
  const [homeMembers] = useState<HomeMember[]>([
    { id: 1, homeId: 1, userId: 1, role: 'admin' },
    { id: 2, homeId: 2, userId: 1, role: 'admin' },
    { id: 3, homeId: 3, userId: 1, role: 'member' }
  ]);

  const [selectedHomeId, setSelectedHomeId] = useState(1);

  const [devices, setDevices] = useState([
    {
      id: 1,
      homeId: 1,
      name: 'Sensor Baño Principal',
      location: 'Baño Principal',
      status: 'online' as const,
      battery: 85,
      signal: 95,
      flowRate: 0.05,
      totalVolume: 15.2,
      threshold: 10,
      lastCalibration: '2025-09-15'
    },
    {
      id: 2,
      homeId: 1,
      name: 'Sensor Cocina',
      location: 'Cocina',
      status: 'online' as const,
      battery: 92,
      signal: 88,
      flowRate: 0.12,
      totalVolume: 28.5,
      threshold: 15,
      lastCalibration: '2025-09-10'
    },
    {
      id: 3,
      homeId: 1,
      name: 'Sensor Jardín',
      location: 'Jardín',
      status: 'offline' as const,
      battery: 15,
      signal: 45,
      flowRate: 0,
      totalVolume: 8.3,
      threshold: 20,
      lastCalibration: '2025-08-20'
    },
    {
      id: 4,
      homeId: 2,
      name: 'Sensor Baño',
      location: 'Baño',
      status: 'online' as const,
      battery: 78,
      signal: 92,
      flowRate: 0.08,
      totalVolume: 10.5,
      threshold: 12,
      lastCalibration: '2025-09-12'
    },
    {
      id: 5,
      homeId: 3,
      name: 'Sensor Principal',
      location: 'Baño Principal',
      status: 'online' as const,
      battery: 95,
      signal: 88,
      flowRate: 0.06,
      totalVolume: 8.2,
      threshold: 8,
      lastCalibration: '2025-09-18'
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(devices[0]);
  const [tempThreshold, setTempThreshold] = useState(selectedDevice.threshold);

  // Verificar si el usuario actual es admin del hogar
  const isCurrentUserAdmin = (homeId: number): boolean => {
    return homeMembers.some(
      m => m.homeId === homeId && m.userId === CURRENT_USER_ID && m.role === 'admin'
    );
  };

  // Obtener rol del usuario en el hogar seleccionado
  const getCurrentUserRole = (homeId: number): 'admin' | 'member' | null => {
    const membership = homeMembers.find(
      m => m.homeId === homeId && m.userId === CURRENT_USER_ID
    );
    return membership ? membership.role : null;
  };

  // Filtrar dispositivos por hogar seleccionado
  const filteredDevices = devices.filter(d => d.homeId === selectedHomeId);

  // Verificar si el usuario es admin del hogar seleccionado
  const isAdminOfSelectedHome = isCurrentUserAdmin(selectedHomeId);
  const currentHomeRole = getCurrentUserRole(selectedHomeId);

  // RF16 - Registrar nuevo dispositivo
  const handleRegisterDevice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const homeId = Number(formData.get('homeSelect'));

    // Solo permitir si es admin del hogar
    if (!isCurrentUserAdmin(homeId)) {
      toast.error('Acceso denegado', {
        description: 'Solo el administrador del hogar puede registrar dispositivos'
      });
      return;
    }

    const newDevice = {
      id: devices.length > 0 ? Math.max(...devices.map(d => d.id)) + 1 : 1,
      homeId: homeId,
      name: formData.get('deviceName') as string,
      location: formData.get('deviceLocation') as string,
      status: 'online' as const,
      battery: 100,
      signal: 0,
      flowRate: 0,
      totalVolume: 0,
      threshold: Number(formData.get('threshold')) || 10,
      lastCalibration: new Date().toISOString().split('T')[0]
    };

    setDevices([...devices, newDevice]);

    const homeName = homes.find(h => h.id === homeId)?.name;
    toast.success('Dispositivo vinculado', {
      description: `${newDevice.name} ha sido registrado en ${homeName}`
    });

    setIsAddDialogOpen(false);
    e.currentTarget.reset();
  };

  // Actualizar umbral (disponible para miembros y admins)
  const handleUpdateThreshold = (deviceId: number, newThreshold: number) => {
    setDevices(devices.map(d =>
      d.id === deviceId ? { ...d, threshold: newThreshold } : d
    ));

    toast.success('Umbral actualizado', {
      description: `Nuevo umbral: ${newThreshold} m³/hora`
    });
  };

  // RF25 - Eliminar dispositivo
  const handleDeleteDevice = (deviceId: number) => {
    const device = devices.find(d => d.id === deviceId);

    // Eliminar el dispositivo
    setDevices(devices.filter(d => d.id !== deviceId));

    toast.success(t('homes.deviceDeleted'), {
      description: t('homes.deviceDeletedDesc')
    });
  };

  return (
    <div className="space-y-6">
      {/* RF16, RF17 - Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-2xl text-gray-900">{t('devices.title')}</h2>
          <p className="text-gray-600">{t('devices.subtitle', { defaultValue: 'Administra y monitorea tus sensores de agua' })}</p>
        </div>

        {/* Selector de hogar */}
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-end sm:gap-4">
          <div className="flex w-full flex-col gap-1 sm:w-auto">
            <Label className="text-xs text-gray-600">Hogar</Label>
            <Select value={selectedHomeId.toString()} onValueChange={(value) => setSelectedHomeId(Number(value))}>
              <SelectTrigger className="w-full sm:w-[250px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {homes.map((home) => {
                  const role = getCurrentUserRole(home.id);
                  return (
                    <SelectItem key={home.id} value={home.id.toString()}>
                      {home.name} {role === 'admin' ? '(Admin)' : role === 'member' ? '(Miembro)' : ''}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Solo mostrar botón si es admin del hogar seleccionado */}
          {isAdminOfSelectedHome && (
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                  <Plus className="size-4" />
                  Registrar Dispositivo
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <form onSubmit={handleRegisterDevice}>
                  <DialogHeader>
                    <DialogTitle>{t('devices.registerNewDevice', { defaultValue: 'Registrar Dispositivo' })}</DialogTitle>
                    <DialogDescription>
                      Vincula un nuevo sensor IoT al sistema
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="deviceId">ID del Dispositivo *</Label>
                      <Input id="deviceId" name="deviceId" placeholder="AQUA-2024-XXXX" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deviceName">Nombre del dispositivo *</Label>
                      <Input id="deviceName" name="deviceName" placeholder="Ej: Sensor Baño Principal" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="homeSelect">Hogar *</Label>
                      <Select name="homeSelect" required defaultValue={selectedHomeId.toString()}>
                        <SelectTrigger id="homeSelect">
                          <SelectValue placeholder="Seleccionar hogar" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* Solo mostrar hogares donde es admin */}
                          {homes.filter(h => isCurrentUserAdmin(h.id)).map((home) => (
                            <SelectItem key={home.id} value={home.id.toString()}>
                              {home.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deviceLocation">Ubicación específica *</Label>
                      <Input id="deviceLocation" name="deviceLocation" placeholder="Ej: Baño Principal, Cocina..." required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="threshold">Umbral de alerta (m³/hora)</Label>
                      <Input id="threshold" name="threshold" type="number" placeholder="10" defaultValue="10" />
                      <p className="text-xs text-gray-600">
                        Se generará una alerta si el flujo supera este valor
                      </p>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit">
                      Vincular Dispositivo
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {/* Alerta si no es admin */}
      {!isAdminOfSelectedHome && currentHomeRole === 'member' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-blue-900">Acceso de Miembro</h3>
              <p className="text-sm text-blue-700 mt-1">
                Eres miembro de este hogar. Puedes ver los dispositivos y modificar el umbral de flujo, pero no puedes calibrar o eliminar dispositivos.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* RF25 - Lista de dispositivos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDevices.length === 0 && (
          <div className="col-span-full text-center py-12">
            <Droplets className="size-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg text-gray-600 mb-2">No hay dispositivos registrados</h3>
            <p className="text-sm text-gray-500 mb-4">
              {isAdminOfSelectedHome
                ? 'Registra tu primer sensor IoT para comenzar a monitorear el consumo de agua'
                : 'El administrador del hogar debe registrar dispositivos'}
            </p>
          </div>
        )}

        {filteredDevices.map((device) => (
          <Card key={device.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`p-3 rounded-lg ${device.status === 'online' ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <Droplets className={`size-6 ${device.status === 'online' ? 'text-green-600' : 'text-gray-400'}`} />
                  </div>
                  <div>
                    <CardTitle className="text-base">{device.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 text-xs mt-1">
                      <MapPin className="size-3" />
                      {device.location}
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Estado y conectividad */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{t('devices.status')}</span>
                <Badge variant={device.status === 'online' ? 'default' : 'destructive'}>
                  {device.status === 'online' ? (
                    <><Wifi className="size-3 mr-1" /> Online</>
                  ) : (
                    <><WifiOff className="size-3 mr-1" /> Offline</>
                  )}
                </Badge>
              </div>

              {/* Batería */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Battery className="size-4" />
                    Batería
                  </span>
                  <span className={device.battery < 20 ? 'text-red-600' : 'text-gray-900'}>
                    {device.battery}%
                  </span>
                </div>
                <Progress value={device.battery} className="h-2" />
              </div>

              {/* Señal */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Signal className="size-4" />
                    Señal
                  </span>
                  <span>{device.signal}%</span>
                </div>
                <Progress value={device.signal} className="h-2" />
              </div>

              {/* Métricas en tiempo real */}
              <div className="pt-4 border-t space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Flujo actual</span>
                  <span className="flex items-center gap-1">
                    <Activity className="size-4 text-blue-600" />
                    {device.flowRate} m³/h
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Vol. total hoy</span>
                  <span>{device.totalVolume} m³</span>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex gap-2 pt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setSelectedDevice(device);
                        setTempThreshold(device.threshold);
                      }}
                    >
                      <Settings className="size-4" />
                      Configurar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Configuración del Dispositivo</DialogTitle>
                      <DialogDescription>
                        {selectedDevice.name} - {homes.find(h => h.id === selectedDevice.homeId)?.name}
                      </DialogDescription>
                    </DialogHeader>

                    <Tabs defaultValue={isAdminOfSelectedHome ? "general" : "alerts"} className="w-full">
                      <TabsList className="flex w-full flex-wrap">
                        <TabsTrigger value="general" disabled={!isAdminOfSelectedHome}>
                          {t('devices.deviceDetails', {defaultValue: 'General'})}
                        </TabsTrigger>
                        <TabsTrigger value="calibration" disabled={!isAdminOfSelectedHome}>
                          {t('devices.calibration')}
                        </TabsTrigger>
                        <TabsTrigger value="alerts">Alertas</TabsTrigger>
                      </TabsList>

                      {/* RF17 - Configuración general (Solo admin) */}
                      <TabsContent value="general" className="space-y-4">
                        {!isAdminOfSelectedHome ? (
                          <div className="text-center py-8 text-gray-500">
                            <AlertCircle className="size-12 mx-auto mb-2" />
                            <p>Solo el administrador puede modificar la configuración general</p>
                          </div>
                        ) : (
                          <>
                            <div className="space-y-2">
                              <Label>Nombre del dispositivo</Label>
                              <Input defaultValue={selectedDevice.name} />
                            </div>
                            <div className="space-y-2">
                              <Label>Ubicación</Label>
                              <Input defaultValue={selectedDevice.location} />
                            </div>
                            <div className="space-y-2">
                              <Label>{t('devices.status')}</Label>
                              <div className="flex items-center gap-4">
                                <Badge variant={selectedDevice.status === 'online' ? 'default' : 'destructive'}>
                                  {selectedDevice.status}
                                </Badge>
                                <span className="text-sm text-gray-600">
                                  Última conexión: Hace 2 minutos
                                </span>
                              </div>
                            </div>
                            <Button>Guardar Cambios</Button>
                          </>
                        )}
                      </TabsContent>

                      {/* RF26 - Calibración de sensores (Solo admin) */}
                      <TabsContent value="calibration" className="space-y-4">
                        {!isAdminOfSelectedHome ? (
                          <div className="text-center py-8 text-gray-500">
                            <AlertCircle className="size-12 mx-auto mb-2" />
                            <p>Solo el administrador puede calibrar el dispositivo</p>
                          </div>
                        ) : (
                          <>
                            <div className="space-y-2">
                              <Label>Factor K (pulsos por litro)</Label>
                              <Input type="number" defaultValue="450" />
                              <p className="text-xs text-gray-600">
                                Ajusta según las especificaciones del fabricante
                              </p>
                            </div>
                            <div className="space-y-2">
                              <Label>Offset de corrección (m³)</Label>
                              <Input type="number" defaultValue="0" step="0.001" />
                            </div>
                            <div className="text-sm text-gray-600">
                              Última calibración: {selectedDevice.lastCalibration}
                            </div>
                            <Button>Guardar Calibración</Button>
                          </>
                        )}
                      </TabsContent>

                      {/* RF17.1 - Configuración de umbrales (Todos pueden editar) */}
                      <TabsContent value="alerts" className="space-y-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                          <p className="text-sm text-green-800">
                            ✓ Puedes modificar el umbral de flujo máximo
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label>Umbral de flujo máximo (m³/hora)</Label>
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                            <Slider
                              value={[tempThreshold]}
                              onValueChange={(value) => setTempThreshold(value[0])}
                              max={50}
                              step={1}
                              className="flex-1"
                            />
                            <span className="text-sm sm:w-12">{tempThreshold}</span>
                          </div>
                          <p className="text-xs text-gray-600">
                            Alerta cuando el flujo supere este valor
                          </p>
                        </div>

                        <Button onClick={() => handleUpdateThreshold(selectedDevice.id, tempThreshold)}>
                          Guardar Umbral
                        </Button>
                      </TabsContent>
                    </Tabs>

                    <DialogFooter className="gap-2">
                      {/* Solo admin puede eliminar */}
                      {isAdminOfSelectedHome && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="mr-auto">
                              <Trash2 className="size-4" />
                              {t('homes.deleteDevice')}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>{t('homes.deleteDeviceTitle')}</AlertDialogTitle>
                              <AlertDialogDescription>
                                {t('homes.deleteDeviceDesc')}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteDevice(selectedDevice.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                {t('homes.yesDelete')}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* RF27 - Métricas de conectividad */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Conectividad</CardTitle>
          <CardDescription>Monitoreo de señal y energía en las últimas 24 horas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 text-center py-8">
            Gráfico de historial de conectividad (señal, batería, uptime)
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
