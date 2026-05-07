import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { 
  User, 
  Mail, 
  Lock, 
  Globe, 
  MapPin, 
  Shield, 
  Bell,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Plane,
  Download,
  Eye,
  EyeOff
} from 'lucide-react';
import { TwoFactorAuth } from './TwoFactorAuth';
import { VacationMode } from './VacationMode';
import { LanguageSelector } from './LanguageSelector';
import { toast } from 'sonner@2.0.3';
import { useTranslation } from 'react-i18next';

interface AccountSettingsProps {
  userRole: 'admin' | 'technician' | 'user';
}

export function AccountSettings({ userRole }: AccountSettingsProps) {
  const { t } = useTranslation();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [mobileSessionClosed, setMobileSessionClosed] = useState(false);

  // RF6.2 - Actualizar datos personales
  const handleSaveProfile = () => {
    toast.success('Perfil actualizado', {
      description: 'Se ha enviado un correo de verificación a tu cuenta'
    });
  };

  // RF4.3 - Cambiar contraseña
  const handleChangePassword = () => {
    toast.success('Contraseña actualizada', {
      description: 'Se ha enviado un correo de confirmación'
    });
  };

  const handleCloseMobileSession = () => {
    setMobileSessionClosed(true);
    toast.success('Sesión cerrada', {
      description: 'La sesión móvil fue cerrada correctamente'
    });
  };

  const handleCloseAllSessions = () => {
    setMobileSessionClosed(true);
    toast.success('Sesiones cerradas', {
      description: 'Se cerraron todas las sesiones excepto este dispositivo'
    });
  };

  // RF5.1 - Eliminar cuenta
  const handleDeleteAccount = () => {
    toast.success('Solicitud de eliminación enviada', {
      description: 'Recibirás una confirmación por correo electrónico'
    });
  };

  // RF7.2 - Exportar datos personales
  const handleExportData = () => {
    toast.success('Exportación iniciada', {
      description: 'Recibirás tus datos por correo en las próximas 24 horas'
    });
  };

  const handleChangePhoto = () => {
    toast.info('Foto de perfil', {
      description: 'La carga de imagen queda simulada para este prototipo'
    });
  };

  const handleCancelProfile = () => {
    toast.info('Cambios descartados');
  };

  const handleSavePreferences = () => {
    toast.success('Preferencias guardadas');
  };

  return (
    <div className="space-y-6">
      {/* Mostrar badge de rol */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="text-sm text-gray-600">{t('settings.accountType')}</div>
              <div className="text-2xl mt-1">
                {userRole === 'admin' ? 'Administrador del Sistema' :
                 userRole === 'technician' ? 'Técnico Especializado' :
                 'Usuario Final'}
              </div>
            </div>
            <Badge className={`text-sm sm:text-lg px-3 sm:px-4 py-1.5 sm:py-2 ${
              userRole === 'admin' ? 'bg-red-600' :
              userRole === 'technician' ? 'bg-orange-600' :
              'bg-green-600'
            }`}>
              {userRole === 'admin' ? '👑 Admin' :
               userRole === 'technician' ? '🔧 Técnico' :
               '👤 Usuario'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="flex w-full flex-wrap">
          <TabsTrigger value="profile">{t('settings.profile')}</TabsTrigger>
          <TabsTrigger value="security">{t('settings.security')}</TabsTrigger>
          <TabsTrigger value="2fa">2FA</TabsTrigger>
          <TabsTrigger value="privacy">{t('settings.privacy')}</TabsTrigger>
          <TabsTrigger value="preferences">{t('settings.preferences')}</TabsTrigger>
          <TabsTrigger value="account">Cuenta</TabsTrigger>
        </TabsList>

        {/* RF6 - Gestión de cuenta - Perfil */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>Administra tu información personal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <div className="size-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl">
                  JP
                </div>
                <div>
                  <Button variant="outline" size="sm" onClick={handleChangePhoto}>Cambiar foto</Button>
                  <p className="text-xs text-gray-600 mt-2">Formatos: JPG, PNG. Máximo 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* RF6.1 - Mostrar información del usuario */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nombre completo *</Label>
                  <Input id="fullName" defaultValue="Juan Pérez" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico *</Label>
                  <Input id="email" type="email" defaultValue="usuario@ejemplo.com" />
                  <p className="text-xs text-gray-600">
                    Cambiar el correo requiere verificación
                  </p>
                </div>

                {/* RF1.1 - Tipo de documento (C.C/C.E) */}
                <div className="space-y-2">
                  <Label htmlFor="docType">Tipo de documento *</Label>
                  <Select defaultValue="CC">
                    <SelectTrigger id="docType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CC">Cédula de Ciudadanía (C.C)</SelectItem>
                      <SelectItem value="CE">Cédula de Extranjería (C.E)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="docNumber">Número de documento *</Label>
                  <Input id="docNumber" defaultValue="1234567890" disabled />
                  <p className="text-xs text-gray-600">
                    El número de documento no puede modificarse
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" defaultValue="+57 300 123 4567" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <Input id="city" defaultValue="Bogotá" />
                </div>
              </div>

              {/* RF6.2 - Verificación por email para cambios */}
              <Alert>
                <AlertCircle className="size-4" />
                <AlertDescription className="text-sm">
                  Los cambios en información sensible requieren verificación por correo electrónico
                </AlertDescription>
              </Alert>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button onClick={handleSaveProfile}>{t('settings.saveChanges')}</Button>
                <Button variant="outline" onClick={handleCancelProfile}>{t('common.cancel')}</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* RF4 - Seguridad */}
        <TabsContent value="security">
          <div className="space-y-6">
            {/* RF4.1 - Cambiar contraseña desde el perfil */}
            <Card>
              <CardHeader>
                <CardTitle>Cambiar Contraseña</CardTitle>
                <CardDescription>Actualiza tu contraseña de acceso</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Contraseña actual *</Label>
                  <div className="relative">
                    <Input 
                      id="currentPassword" 
                      type={showCurrentPassword ? "text" : "password"} 
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showCurrentPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                {/* RF1.2 - Requisitos de contraseña */}
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nueva contraseña *</Label>
                  <div className="relative">
                    <Input 
                      id="newPassword" 
                      type={showNewPassword ? "text" : "password"} 
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showNewPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-600">
                    Mínimo 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar nueva contraseña *</Label>
                  <Input id="confirmPassword" type="password" />
                </div>

                {/* RF4.4 - Confirmación de cambio */}
                <Alert>
                  <Shield className="size-4" />
                  <AlertDescription className="text-sm">
                    Se enviará un correo de confirmación después de cambiar la contraseña
                  </AlertDescription>
                </Alert>

                <Button onClick={handleChangePassword}>Cambiar Contraseña</Button>
              </CardContent>
            </Card>

            {/* RF37, RF38 - Sesiones activas con JWT */}
            <Card>
              <CardHeader>
                <CardTitle>Sesiones Activas</CardTitle>
                <CardDescription>Dispositivos donde has iniciado sesión</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-3 p-4 border rounded-lg sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="text-sm">Navegador Chrome - Windows</div>
                    <div className="text-xs text-gray-600">Bogotá, Colombia • Activa ahora</div>
                    <div className="text-xs text-gray-500 mt-1">Token: ••••••••</div>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <CheckCircle2 className="size-3 mr-1" />
                    Este dispositivo
                  </Badge>
                </div>

                {!mobileSessionClosed && (
                <div className="flex flex-col gap-3 p-4 border rounded-lg sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="text-sm">Aplicación móvil - Android</div>
                    <div className="text-xs text-gray-600">Bogotá, Colombia • Hace 2 horas</div>
                    <div className="text-xs text-gray-500 mt-1">Token: ••••••••</div>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleCloseMobileSession}>
                    Cerrar sesión
                  </Button>
                </div>
                )}

                {/* RF38.4 - Invalidar todos los Refresh Tokens */}
                <Button variant="destructive" className="w-full" onClick={handleCloseAllSessions}>
                  Cerrar todas las sesiones
                </Button>

                <Alert>
                  <Shield className="size-4" />
                  <AlertDescription className="text-sm">
                    Las sesiones usan tokens JWT con renovación automática. Cerrar sesiones
                    invalida todos los tokens de acceso y actualización.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* RF36 - Autenticación de dos factores (2FA) */}
        <TabsContent value="2fa">
          <TwoFactorAuth userRole={userRole} />
        </TabsContent>

        {/* RF7 - Privacidad */}
        <TabsContent value="privacy">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacidad de Datos</CardTitle>
                <CardDescription>Controla cómo se utilizan tus datos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Compartir datos de consumo</Label>
                    <p className="text-xs text-gray-600">
                      Permitir compartir datos anónimos para mejorar el servicio
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Análisis de uso</Label>
                    <p className="text-xs text-gray-600">
                      Ayúdanos a mejorar mediante análisis de uso
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                {/* RF7.4 - Registro de consentimientos */}
                <div className="pt-4 border-t">
                  <h3 className="text-sm mb-4">Consentimientos Registrados</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <input type="checkbox" defaultChecked disabled className="mt-1" />
                      <div className="text-xs">
                        <p>Acepto los <span className="text-blue-600 cursor-pointer">Términos y Condiciones</span></p>
                        <p className="text-gray-600">Aceptado el 15 de Septiembre, 2025</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <input type="checkbox" defaultChecked disabled className="mt-1" />
                      <div className="text-xs">
                        <p>Acepto la <span className="text-blue-600 cursor-pointer">Política de Privacidad</span></p>
                        <p className="text-gray-600">Aceptado el 15 de Septiembre, 2025</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Shield className="size-4" />
                  <AlertDescription className="text-sm">
                    Tus datos están protegidos según la normativa de protección de datos vigente
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* RF7.2 - Solicitar eliminación de datos */}
            <Card>
              <CardHeader>
                <CardTitle>Exportar Datos</CardTitle>
                <CardDescription>Descarga una copia de tu información personal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Puedes solicitar una copia de todos tus datos personales y de consumo
                  conforme a la normativa vigente (RGPD-like).
                </p>
                <Button variant="outline" onClick={handleExportData}>
                  <Download className="size-4 mr-2" />
                  Solicitar Exportación de Datos
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* RF33, RF29 - Preferencias */}
        <TabsContent value="preferences">
          <div className="space-y-6">
            {/* RF33 - Internacionalización */}
            <LanguageSelector />

            {/* Unidades y formatos */}
            <Card>
              <CardHeader>
                <CardTitle>Unidades y Formatos</CardTitle>
                <CardDescription>Configura tus preferencias de visualización</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Zona horaria</Label>
                  <Select defaultValue="bogota">
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bogota">América/Bogotá (GMT-5)</SelectItem>
                      <SelectItem value="mexico">América/México (GMT-6)</SelectItem>
                      <SelectItem value="argentina">América/Buenos Aires (GMT-3)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* RF33.3 - Unidades de medida */}
                <div className="space-y-2">
                  <Label htmlFor="units">Sistema de unidades</Label>
                  <Select defaultValue="metric">
                    <SelectTrigger id="units">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Métrico (m³, L)</SelectItem>
                      <SelectItem value="imperial">Imperial (gal, ft³)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleSavePreferences}>Guardar Preferencias</Button>
              </CardContent>
            </Card>

            {/* RF12.3 - Ubicación */}
            <Card>
              <CardHeader>
                <CardTitle>Ubicación</CardTitle>
                <CardDescription>Configura los permisos de ubicación para dispositivos IoT</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Permisos de ubicación</Label>
                  <Select defaultValue="inuse">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="always">Permitir siempre</SelectItem>
                      <SelectItem value="inuse">Permitir mientras se usa la app</SelectItem>
                      <SelectItem value="never">No permitir</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-600">
                    La ubicación se usa para asociar dispositivos a direcciones específicas
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* RF29 - Modo Vacaciones */}
            <VacationMode />
          </div>
        </TabsContent>

        {/* RF5 - Eliminación de cuenta */}
        <TabsContent value="account">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información de la Cuenta</CardTitle>
                <CardDescription>Detalles y estadísticas de tu cuenta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Fecha de registro</div>
                    <div className="text-sm">15 de Septiembre, 2025</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">{t('settings.accountType')}</div>
                    <Badge>{userRole === 'admin' ? 'Administrador' : userRole === 'technician' ? 'Técnico' : 'Usuario'}</Badge>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Hogares registrados</div>
                    <div className="text-sm">2 hogares</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Dispositivos activos</div>
                    <div className="text-sm">5 dispositivos</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* RF5.1 - Eliminación de cuenta */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600">Zona de Peligro</CardTitle>
                <CardDescription>Acciones irreversibles en tu cuenta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert variant="destructive">
                  <AlertCircle className="size-4" />
                  <AlertDescription className="text-sm">
                    La eliminación de la cuenta es permanente y no se puede deshacer. Todos tus datos serán eliminados.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <p className="text-sm">Al eliminar tu cuenta:</p>
                  <ul className="text-xs text-gray-600 list-disc list-inside space-y-1">
                    <li>Se eliminarán todos tus datos personales</li>
                    <li>Se desvinculará todos los dispositivos</li>
                    <li>Se perderá el historial de consumo</li>
                    <li>Se eliminarán todos los hogares asociados</li>
                    <li>Esta acción no se puede revertir</li>
                  </ul>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="size-4 mr-2" />
                      Eliminar mi cuenta
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer. Se eliminarán permanentemente todos
                        tus datos, dispositivos y hogares asociados. Recibirás un correo de
                        confirmación.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                        Sí, eliminar mi cuenta
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
