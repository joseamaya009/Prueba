import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useTranslation } from 'react-i18next';
import { 
  Bell, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  Droplets,
  TrendingUp,
  Battery,
  Settings
} from 'lucide-react';

export function NotificationsPanel() {
  const { t } = useTranslation();
  // RF8.4 - Historial de notificaciones
  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'Posible fuga detectada',
      message: 'Flujo continuo detectado en Sensor Jardín por más de 3 horas',
      time: '2 horas',
      read: false,
      icon: AlertTriangle,
      color: 'orange'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Batería baja',
      message: 'El Sensor Jardín tiene batería baja (15%). Considera reemplazarla pronto.',
      time: '5 horas',
      read: false,
      icon: Battery,
      color: 'yellow'
    },
    {
      id: 3,
      type: 'info',
      title: 'Reporte semanal',
      message: 'Has consumido 15.8 m³ esta semana. 12% menos que la semana anterior.',
      time: '1 día',
      read: true,
      icon: Droplets,
      color: 'blue'
    },
    {
      id: 4,
      type: 'success',
      title: 'Meta alcanzada',
      message: '¡Felicitaciones! Has cumplido tu meta de ahorro mensual.',
      time: '2 días',
      read: true,
      icon: CheckCircle2,
      color: 'green'
    },
    {
      id: 5,
      type: 'info',
      title: 'Consumo elevado',
      message: 'Tu consumo de ayer fue 28% mayor al promedio. Revisa posibles causas.',
      time: '3 días',
      read: true,
      icon: TrendingUp,
      color: 'blue'
    }
  ];

  return (
    <div className="space-y-6">
      {/* RF8.3 - Configuración de notificaciones */}
      <Card>
        <CardHeader>
          <CardTitle>{t('notifications.settings')}</CardTitle>
          <CardDescription>Personaliza cómo y cuándo deseas recibir alertas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* RF8.1 - Notificaciones de consumo */}
            <div>
              <h3 className="text-sm mb-4">Notificaciones de Consumo</h3>
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 space-y-0.5">
                    <Label>Reporte diario de consumo</Label>
                    <p className="text-xs text-gray-600">Recibe un resumen diario de tu consumo</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 space-y-0.5">
                    <Label>Reporte semanal</Label>
                    <p className="text-xs text-gray-600">Resumen semanal con comparativas</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 space-y-0.5">
                    <Label>Reporte mensual</Label>
                    <p className="text-xs text-gray-600">Análisis completo del mes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            {/* RF8.2 - Alertas de fugas y consumo anormal */}
            <div className="pt-6 border-t">
              <h3 className="text-sm mb-4">Alertas Críticas</h3>
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 space-y-0.5">
                    <Label>Detección de fugas</Label>
                    <p className="text-xs text-gray-600">Alerta inmediata ante posibles fugas</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 space-y-0.5">
                    <Label>Consumo anormal</Label>
                    <p className="text-xs text-gray-600">Notificar consumo fuera de lo normal</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 space-y-0.5">
                    <Label>Umbral de flujo superado</Label>
                    <p className="text-xs text-gray-600">Alerta cuando se supere el umbral configurado</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t">
              <h3 className="text-sm mb-4">Estado de Dispositivos</h3>
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 space-y-0.5">
                    <Label>Dispositivo desconectado</Label>
                    <p className="text-xs text-gray-600">Notificar cuando un sensor pierda conexión</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 space-y-0.5">
                    <Label>Batería baja</Label>
                    <p className="text-xs text-gray-600">Alertar cuando la batería esté por debajo del 20%</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t">
              <h3 className="text-sm mb-4">Canales de Notificación</h3>
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 space-y-0.5">
                    <Label>Notificaciones push</Label>
                    <p className="text-xs text-gray-600">En la aplicación y navegador</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 space-y-0.5">
                    <Label>Correo electrónico</Label>
                    <p className="text-xs text-gray-600">Recibir notificaciones por email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RF8.4 - Historial de notificaciones */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <CardTitle>Historial de Notificaciones</CardTitle>
              <CardDescription>Todas tus notificaciones y alertas</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              Marcar todas como leídas
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="w-full mobile-equal-tabs [--mobile-tabs:2] sm:w-fit">
              <TabsTrigger value="all">
                Todas ({notifications.length})
              </TabsTrigger>
              <TabsTrigger value="unread">
                No leídas ({notifications.filter(n => !n.read).length})
              </TabsTrigger>
              <TabsTrigger value="alerts">{t('notifications.alerts', { defaultValue: 'Alertas' })}</TabsTrigger>
              <TabsTrigger value="info">{t('notifications.updates', {defaultValue: 'Información'})}</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3 mt-4">
              {notifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${
                      !notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      notification.color === 'orange' ? 'bg-orange-100' :
                      notification.color === 'yellow' ? 'bg-yellow-100' :
                      notification.color === 'blue' ? 'bg-blue-100' :
                      notification.color === 'green' ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <Icon className={`size-5 ${
                        notification.color === 'orange' ? 'text-orange-600' :
                        notification.color === 'yellow' ? 'text-yellow-600' :
                        notification.color === 'blue' ? 'text-blue-600' :
                        notification.color === 'green' ? 'text-green-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm">{notification.title}</h4>
                          <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                        </div>
                        {!notification.read && (
                          <Badge variant="default" className="bg-blue-600">Nuevo</Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Hace {notification.time}</p>
                    </div>
                  </div>
                );
              })}
            </TabsContent>

            <TabsContent value="unread" className="space-y-3 mt-4">
              {notifications.filter(n => !n.read).map((notification) => {
                const Icon = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className="flex items-start gap-4 p-4 rounded-lg border bg-blue-50 border-blue-200"
                  >
                    <div className={`p-2 rounded-lg ${
                      notification.color === 'orange' ? 'bg-orange-100' :
                      notification.color === 'yellow' ? 'bg-yellow-100' :
                      'bg-blue-100'
                    }`}>
                      <Icon className={`size-5 ${
                        notification.color === 'orange' ? 'text-orange-600' :
                        notification.color === 'yellow' ? 'text-yellow-600' :
                        'text-blue-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm">{notification.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">Hace {notification.time}</p>
                    </div>
                  </div>
                );
              })}
            </TabsContent>

            <TabsContent value="alerts" className="text-center py-8 text-gray-600">
              Filtrando solo alertas críticas...
            </TabsContent>

            <TabsContent value="info" className="text-center py-8 text-gray-600">
              Filtrando solo notificaciones informativas...
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
