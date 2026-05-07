import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import {
  FileText,
  Download,
  Calendar as CalendarIcon,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  Settings,
  FileSpreadsheet,
  Building2
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { toast } from 'sonner@2.0.3';
import { useTranslation } from 'react-i18next';

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

export function ReportsAnalytics() {
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
  const [dateRange, setDateRange] = useState<Date | undefined>(new Date());
  const [isTariffDialogOpen, setIsTariffDialogOpen] = useState(false);
  const [tariffRate, setTariffRate] = useState(3450);

  // Obtener rol del usuario en el hogar seleccionado
  const getCurrentUserRole = (homeId: number): 'admin' | 'member' | null => {
    const membership = homeMembers.find(
      m => m.homeId === homeId && m.userId === CURRENT_USER_ID
    );
    return membership ? membership.role : null;
  };

  const currentHomeRole = getCurrentUserRole(selectedHomeId);

  // RF23 - Exportar a PDF
  const handleExportPDF = () => {
    toast.success(t('reports.generateReport', {defaultValue: 'Generando reporte PDF'}), {
      description: t('reports.exportData', {defaultValue: 'Tu reporte se descargará en unos segundos'})
    });
  };

  // RF23.2 - Exportar a Excel
  const handleExportExcel = () => {
    toast.success(t('reports.generateReport', {defaultValue: 'Generando reporte Excel'}), {
      description: t('reports.exportData', {defaultValue: 'Tu archivo Excel se descargará en unos segundos'})
    });
  };

  // RF17.3 - Guardar configuración de tarifas
  const handleSaveTariff = () => {
    toast.success(t('common.update', {defaultValue: 'Tarifa actualizada'}), {
      description: `${t('common.new', {defaultValue: 'Nueva'})} tarifa: $${tariffRate} COP/m³`
    });
    setIsTariffDialogOpen(false);
  };

  // RF15 - Datos para comparativas históricas
  const monthlyComparison = [
    { month: 'Ene', current: 48.5, previous: 55.2 },
    { month: 'Feb', current: 52.3, previous: 58.1 },
    { month: 'Mar', current: 45.8, previous: 52.3 },
    { month: 'Abr', current: 51.2, previous: 54.8 },
    { month: 'May', current: 49.5, previous: 56.5 },
    { month: 'Jun', current: 47.3, previous: 53.2 },
  ];

  // RF13 - Análisis de tendencias
  const weeklyTrends = [
    { week: 'Sem 1', consumption: 12.5, avg: 13.2 },
    { week: 'Sem 2', consumption: 13.8, avg: 13.2 },
    { week: 'Sem 3', consumption: 11.2, avg: 13.2 },
    { week: 'Sem 4', consumption: 14.8, avg: 13.2 },
  ];

  // RF14 - Datos de reporte detallado
  const consumptionSegments = [
    { segment: 'Baño', consumption: 28.5, percentage: 54 },
    { segment: 'Cocina', consumption: 15.2, percentage: 29 },
    { segment: 'Jardín', consumption: 8.6, percentage: 17 },
  ];

  return (
    <div className="space-y-6">
      {/* Selector de hogar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-2xl text-gray-900">{t('reports.title', {defaultValue: 'Reportes y Análisis'})}</h2>
          <p className="text-gray-600">Visualiza el consumo de agua de tus hogares</p>
        </div>
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
                    <div className="flex items-center gap-2">
                      <Building2 className="size-4" />
                      {home.name} {role === 'admin' ? '(Admin)' : role === 'member' ? '(Miembro)' : ''}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* RF14 - Generación de reportes */}
      <Card>
        <CardHeader>
          <CardTitle>{t('reports.generateReport')}</CardTitle>
          <CardDescription>
            {t('reports.subtitle', {defaultValue: 'Crea reportes personalizados de consumo de agua'})} - {homes.find(h => h.id === selectedHomeId)?.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm">{t('reports.customReport', {defaultValue: 'Tipo de reporte'})}</label>
              <Select defaultValue="detailed">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="detailed">{t('reports.dailyReport', {defaultValue: 'Detallado'})}</SelectItem>
                  <SelectItem value="summary">{t('common.summary', {defaultValue: 'Resumen'})}</SelectItem>
                  <SelectItem value="comparative">{t('reports.comparedToLastMonth', {defaultValue: 'Comparativo'})}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm">{t('goals.period', {defaultValue: 'Periodo'})}</label>
              <Select defaultValue="monthly">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">{t('goals.daily', {defaultValue: 'Diario'})}</SelectItem>
                  <SelectItem value="weekly">{t('goals.weekly', {defaultValue: 'Semanal'})}</SelectItem>
                  <SelectItem value="monthly">{t('goals.monthly', {defaultValue: 'Mensual'})}</SelectItem>
                  <SelectItem value="annual">{t('reports.customPeriod', {defaultValue: 'Anual'})}</SelectItem>
                  <SelectItem value="custom">{t('reports.customPeriod', {defaultValue: 'Personalizado'})}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm">{t('common.date', {defaultValue: 'Fecha'})}</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="size-4" />
                    {dateRange ? dateRange.toLocaleDateString() : t('common.select')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateRange}
                    onSelect={setDateRange}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm">{t('devices.actions', {defaultValue: 'Acción'})}</label>
              <Button className="w-full" onClick={handleExportPDF}>
                <Download className="size-4" />
                {t('reports.exportAsPDF', {defaultValue: 'Descargar PDF'})}
              </Button>
              <Button className="w-full" onClick={handleExportExcel}>
                <FileSpreadsheet className="size-4" />
                {t('reports.exportAsExcel', {defaultValue: 'Descargar Excel'})}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RF15 - Comparativas históricas */}
      <Card>
        <CardHeader>
          <CardTitle>Comparativa Histórica</CardTitle>
          <CardDescription>Compara el consumo actual con periodos anteriores</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="monthly">
            <TabsList className="w-full mobile-equal-tabs [--mobile-tabs:3] sm:w-fit">
              <TabsTrigger value="monthly">Mensual</TabsTrigger>
              <TabsTrigger value="weekly">Semanal</TabsTrigger>
              <TabsTrigger value="yearly">Anual</TabsTrigger>
            </TabsList>

            <TabsContent value="monthly">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm text-gray-600">Este mes</div>
                    <div className="text-2xl mt-1">52.3 m³</div>
                    <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
                      <TrendingDown className="size-4" />
                      <span>-11% vs mes anterior</span>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">Mes anterior</div>
                    <div className="text-2xl mt-1">58.1 m³</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">Promedio 6 meses</div>
                    <div className="text-2xl mt-1">54.7 m³</div>
                  </div>
                </div>

                <div className="w-full h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyComparison}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="current" fill="#3b82f6" name="Año actual" />
                      <Bar dataKey="previous" fill="#94a3b8" name="Año anterior" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="weekly">
              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="consumption" stroke="#3b82f6" name="Consumo" />
                    <Line type="monotone" dataKey="avg" stroke="#94a3b8" strokeDasharray="5 5" name="Promedio" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="yearly">
              <div className="text-center py-8 text-gray-600">
                Comparativa anual disponible desde el segundo año de uso
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* RF14.2 - Consumo segmentado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Consumo por Segmento</CardTitle>
            <CardDescription>Distribución del consumo mensual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consumptionSegments.map((segment) => (
                <div key={segment.segment} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{segment.segment}</span>
                    <span className="flex items-center gap-2">
                      <span>{segment.consumption} m³</span>
                      <Badge variant="outline">{segment.percentage}%</Badge>
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${segment.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* RF13 - Análisis de tendencias */}
        <Card>
          <CardHeader>
            <CardTitle>Análisis de Tendencias</CardTitle>
            <CardDescription>Insights basados en tu consumo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-3">
                <TrendingDown className="size-5 text-green-600 mt-0.5" />
                <div>
                  <div className="text-sm">Tendencia positiva</div>
                  <p className="text-xs text-gray-600 mt-1">
                    Tu consumo ha disminuido un 11% este mes. ¡Excelente trabajo!
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="size-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="text-sm">Mayor consumo detectado</div>
                  <p className="text-xs text-gray-600 mt-1">
                    Los fines de semana tu consumo aumenta un 25% en promedio
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-start gap-3">
                <FileText className="size-5 text-purple-600 mt-0.5" />
                <div>
                  <div className="text-sm">Horario pico</div>
                  <p className="text-xs text-gray-600 mt-1">
                    Tu mayor consumo ocurre entre 7:00 - 9:00 AM y 7:00 - 9:00 PM
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RF21 - Proyección de tarifas */}
      <Card>
        <CardHeader>
          <CardTitle>Proyección de Costos</CardTitle>
          <CardDescription>Estimación de factura basada en consumo actual</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="text-sm text-gray-600">Consumo actual</div>
              <div className="text-2xl mt-1">52.3 m³</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Tarifa agua</div>
              <div className="text-2xl mt-1">$3,450</div>
              <div className="text-xs text-gray-600">por m³</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Proyección mes</div>
              <div className="text-2xl mt-1">$270,855</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Ahorro estimado</div>
              <div className="text-2xl mt-1 text-green-600">$33,450</div>
              <div className="text-xs text-gray-600">vs mes anterior</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RF17.3 - Configuración de tarifas */}
      <Dialog open={isTariffDialogOpen} onOpenChange={setIsTariffDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            <Settings className="size-4 mr-2" />
            Configurar tarifas
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configurar tarifas</DialogTitle>
            <DialogDescription>Define la tarifa de agua para tus reportes</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Label htmlFor="tariffRate">Tarifa de agua (COP/m³)</Label>
            <Input
              id="tariffRate"
              type="number"
              value={tariffRate}
              onChange={(e) => setTariffRate(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSaveTariff}>
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
