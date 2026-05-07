import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Headphones, Plus, Clock, CheckCircle2, XCircle, MessageSquare, AlertCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useTranslation } from 'react-i18next';

// RF35 - Soporte técnico
export function SupportTickets() {
  const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // RF35.3 - Tickets simulados con estados
  const tickets = [
    {
      id: 'TKT-2025-001',
      title: 'Dispositivo IoT desconectado',
      description: 'El sensor de cocina no se conecta desde hace 2 días',
      category: 'Dispositivo',
      priority: 'Alta',
      status: 'open',
      createdAt: '2025-10-28T09:00:00',
      updatedAt: '2025-10-28T09:00:00',
      responses: []
    },
    {
      id: 'TKT-2025-002',
      title: 'Error en reporte mensual',
      description: 'El reporte del mes de septiembre no se genera correctamente',
      category: 'Reportes',
      priority: 'Media',
      status: 'in_progress',
      createdAt: '2025-10-27T14:30:00',
      updatedAt: '2025-10-28T10:15:00',
      assignedTo: 'Técnico IoT',
      responses: [
        {
          from: 'Soporte AquaMonitor',
          message: 'Hemos identificado el problema. Estamos trabajando en la solución.',
          timestamp: '2025-10-27T16:00:00'
        }
      ]
    },
    {
      id: 'TKT-2025-003',
      title: 'Consulta sobre tarifas',
      description: '¿Cómo puedo configurar diferentes tarifas para cada hogar?',
      category: 'Consulta',
      priority: 'Baja',
      status: 'closed',
      createdAt: '2025-10-25T11:00:00',
      updatedAt: '2025-10-26T09:00:00',
      resolvedAt: '2025-10-26T09:00:00',
      responses: [
        {
          from: 'Soporte AquaMonitor',
          message: 'Puedes configurar tarifas diferentes desde la sección de Configuración > Tarifas. Selecciona cada hogar y asigna la tarifa correspondiente.',
          timestamp: '2025-10-25T15:00:00'
        }
      ]
    },
    {
      id: 'TKT-2025-004',
      title: 'Fuga no detectada',
      description: 'Tuve una fuga en el baño pero el sistema no la detectó',
      category: 'Detección',
      priority: 'Alta',
      status: 'in_progress',
      createdAt: '2025-10-24T08:00:00',
      updatedAt: '2025-10-28T08:00:00',
      assignedTo: 'Técnico Especialista',
      responses: [
        {
          from: 'Soporte AquaMonitor',
          message: 'Vamos a revisar la calibración del sensor. ¿Podrías indicarnos el código del dispositivo?',
          timestamp: '2025-10-24T10:00:00'
        },
        {
          from: 'Juan Pérez',
          message: 'El código es IOT-001',
          timestamp: '2025-10-24T11:00:00'
        },
        {
          from: 'Técnico Especialista',
          message: 'Gracias. Hemos programado una visita técnica para revisar el sensor.',
          timestamp: '2025-10-25T09:00:00'
        }
      ]
    }
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'open':
        return { label: 'Abierto', icon: Clock, color: 'bg-blue-100 text-blue-800 border-blue-200' };
      case 'in_progress':
        return { label: 'En Proceso', icon: MessageSquare, color: 'bg-orange-100 text-orange-800 border-orange-200' };
      case 'closed':
        return { label: 'Cerrado', icon: CheckCircle2, color: 'bg-green-100 text-green-800 border-green-200' };
      default:
        return { label: 'Desconocido', icon: XCircle, color: 'bg-gray-100 text-gray-800 border-gray-200' };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Alta':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Media':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Baja':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // RF35.1 - Crear nuevo ticket
  const handleCreateTicket = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // RF35.2 - Generar número de ticket
    const ticketNumber = `TKT-${new Date().getFullYear()}-${String(tickets.length + 1).padStart(3, '0')}`;
    
    console.log('Nuevo ticket creado:', {
      ticketNumber,
      title: formData.get('title'),
      category: formData.get('category'),
      priority: formData.get('priority'),
      description: formData.get('description'),
      timestamp: new Date().toISOString()
    });

    toast.success(`Ticket creado: ${ticketNumber}`, {
      description: 'Recibirás notificaciones sobre el estado de tu solicitud'
    });

    setIsDialogOpen(false);
    e.currentTarget.reset();
  };

  const filteredTickets = tickets.filter(ticket => {
    if (activeTab === 'all') return true;
    return ticket.status === activeTab;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg sm:p-3">
                <Headphones className="size-6 text-blue-600" />
              </div>
              <div className="min-w-0">
                <CardTitle>{t('support.title')}</CardTitle>
                <CardDescription>
                  Gestiona tus solicitudes de ayuda y consultas
                </CardDescription>
              </div>
            </div>
            {/* RF35.1 - Reportar problema */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                  <Plus className="size-4" />
                  Nuevo Ticket
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <form onSubmit={handleCreateTicket}>
                  <DialogHeader>
                    <DialogTitle>Crear Ticket de Soporte</DialogTitle>
                    <DialogDescription>
                      Describe tu problema o consulta y te ayudaremos lo antes posible
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título del problema *</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Ej: Dispositivo no se conecta"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Categoría *</Label>
                        <Select name="category" required>
                          <SelectTrigger id="category">
                            <SelectValue placeholder={t('common.select', {defaultValue: 'Seleccionar'})} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Dispositivo">{t('support.device', {defaultValue: 'Dispositivo IoT'})}</SelectItem>
                            <SelectItem value="Reportes">{t('nav.reports', {defaultValue: 'Reportes'})}</SelectItem>
                            <SelectItem value="Consumo">{t('dashboard.todayConsumption', {defaultValue: 'Consumo'})}</SelectItem>
                            <SelectItem value="Detección">{t('notifications.leakAlerts', {defaultValue: 'Detección de fugas'})}</SelectItem>
                            <SelectItem value="Cuenta">{t('support.account', {defaultValue: 'Cuenta y perfil'})}</SelectItem>
                            <SelectItem value="Facturación">{t('support.billing', {defaultValue: 'Facturación'})}</SelectItem>
                            <SelectItem value="Consulta">{t('support.other', {defaultValue: 'Consulta general'})}</SelectItem>
                            <SelectItem value="Otro">{t('support.other', {defaultValue: 'Otro'})}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="priority">Prioridad *</Label>
                        <Select name="priority" required>
                          <SelectTrigger id="priority">
                            <SelectValue placeholder={t('common.select', {defaultValue: 'Seleccionar'})} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Alta">{t('support.high', { defaultValue: 'Alta' })}</SelectItem>
                            <SelectItem value="Media">{t('support.medium', { defaultValue: 'Media' })}</SelectItem>
                            <SelectItem value="Baja">{t('support.low', { defaultValue: 'Baja' })}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Descripción detallada *</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Describe tu problema o consulta con el mayor detalle posible..."
                        rows={6}
                        required
                      />
                    </div>

                    <Alert>
                      <AlertCircle className="size-4" />
                      <AlertDescription className="text-sm">
                        Un técnico revisará tu solicitud y recibirás una respuesta en un plazo
                        máximo de 24-48 horas según la prioridad.
                      </AlertDescription>
                    </Alert>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit">
                      Crear Ticket
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* RF35.3 - Tabs para filtrar por estado */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="w-full mobile-equal-tabs [--mobile-tabs:2] sm:flex">
              <TabsTrigger value="all">
                Todos ({tickets.length})
              </TabsTrigger>
              <TabsTrigger value="open">
                Abiertos ({tickets.filter(t => t.status === 'open').length})
              </TabsTrigger>
              <TabsTrigger value="in_progress">
                En Proceso ({tickets.filter(t => t.status === 'in_progress').length})
              </TabsTrigger>
              <TabsTrigger value="closed">
                Cerrados ({tickets.filter(t => t.status === 'closed').length})
              </TabsTrigger>
            </TabsList>

            <div className="space-y-4">
              {filteredTickets.map((ticket) => {
                const statusInfo = getStatusInfo(ticket.status);
                const StatusIcon = statusInfo.icon;

                return (
                  <Card key={ticket.id}>
                    <CardHeader className="pb-3">
                      <div className="flex min-w-0 items-start">
                        <div className="flex min-w-0 flex-1 items-start gap-3">
                          <div className="shrink-0 bg-blue-50 p-2 rounded-lg mt-1">
                            <Headphones className="size-5 text-blue-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="mb-2">
                              <CardTitle className="text-base">{ticket.title}</CardTitle>
                            </div>
                            <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-600 sm:text-sm">
                              <Badge variant="secondary" className="text-xs">
                                {ticket.id}
                              </Badge>
                              <Badge className={getPriorityColor(ticket.priority)}>
                                {ticket.priority}
                              </Badge>
                              <Badge className={statusInfo.color}>
                                <StatusIcon className="size-3 mr-1" />
                                {statusInfo.label}
                              </Badge>
                              <span>•</span>
                              <span>{ticket.category}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-700">{ticket.description}</p>
                      
                      {ticket.responses.length > 0 && (
                        <div className="space-y-2 pt-3 border-t">
                          <p className="text-sm font-medium">Respuestas ({ticket.responses.length}):</p>
                          {ticket.responses.map((response, idx) => (
                            <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-1">
                                <span className="text-sm font-medium">{response.from}</span>
                                <span className="text-xs text-gray-500">
                                  {new Date(response.timestamp).toLocaleString('es-CO')}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700">{response.message}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-col gap-1 pt-2 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
                        <span>Creado: {new Date(ticket.createdAt).toLocaleString('es-CO')}</span>
                        {ticket.assignedTo && (
                          <span>Asignado a: {ticket.assignedTo}</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {filteredTickets.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Headphones className="size-12 mx-auto mb-4 opacity-50" />
                  <p>No hay tickets {activeTab !== 'all' ? getStatusInfo(activeTab).label.toLowerCase() : ''}</p>
                </div>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
