import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { 
  Target, 
  TrendingDown, 
  DollarSign, 
  Droplets,
  Calendar,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export function GoalsConfig() {
  const { t } = useTranslation();
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  const [consumptionLimit, setConsumptionLimit] = useState(75);
  const [budgetLimit, setBudgetLimit] = useState(300000);
  const [waterRate, setWaterRate] = useState(3450);
  // RF30 - Configuración de metas
  const currentGoal = {
    type: 'consumption',
    limit: consumptionLimit,
    current: 52.3,
    unit: 'm³',
    period: 'mensual',
    percentage: 69.7
  };

  const budgetGoal = {
    type: 'cost',
    limit: budgetLimit,
    current: 270855,
    unit: 'COP',
    period,
    percentage: 90.3
  };

  const handleUpdateConsumptionGoal = () => {
    toast.success('Meta actualizada', {
      description: `Nuevo límite: ${consumptionLimit} m³ (${period === 'daily' ? 'diario' : period === 'weekly' ? 'semanal' : 'mensual'})`
    });
  };

  const handleUpdateBudgetGoal = () => {
    toast.success('Presupuesto actualizado', {
      description: `Presupuesto: $${budgetLimit.toLocaleString('es-CO')} COP, tarifa: $${waterRate.toLocaleString('es-CO')} COP/m³`
    });
  };

  return (
    <div className="space-y-6">
      {/* RF30 - Resumen de metas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Meta de consumo */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{t('goals.title', {defaultValue: 'Meta de Consumo'})}</CardTitle>
                <CardDescription>Límite mensual de agua</CardDescription>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Droplets className="size-6 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl">{currentGoal.current}</span>
                <span className="text-gray-600 mb-1">/ {currentGoal.limit} {currentGoal.unit}</span>
              </div>
              <Progress value={currentGoal.percentage} className="h-3" />
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-600">{currentGoal.percentage.toFixed(1)}% usado</span>
                <Badge variant={currentGoal.percentage < 80 ? 'default' : 'destructive'}>
                  {currentGoal.percentage < 80 ? t('goals.onTrack', {defaultValue: 'En rango'}) : t('goals.atRisk', {defaultValue: 'Cerca del límite'})}
                </Badge>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 text-green-600">
                <TrendingDown className="size-5" />
                <div>
                  <div className="text-sm">30% menos que el mes pasado</div>
                  <div className="text-xs text-gray-600">¡Vas por buen camino!</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Meta de presupuesto */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{t('goals.title', {defaultValue: 'Meta de Presupuesto'})}</CardTitle>
                <CardDescription>Límite mensual de gasto</CardDescription>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="size-6 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl">${(budgetGoal.current / 1000).toFixed(0)}k</span>
                <span className="text-gray-600 mb-1">/ ${(budgetGoal.limit / 1000).toFixed(0)}k {budgetGoal.unit}</span>
              </div>
              <Progress value={budgetGoal.percentage} className="h-3" />
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-600">{budgetGoal.percentage.toFixed(1)}% usado</span>
                <Badge variant="destructive">Cerca del límite</Badge>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 text-orange-600">
                <AlertCircle className="size-5" />
                <div>
                  <div className="text-sm">Solo quedan $29,145 disponibles</div>
                  <div className="text-xs text-gray-600">Considera reducir el consumo</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RF30.1, RF30.4 - Configurar metas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Configurar Meta de Consumo</CardTitle>
            <CardDescription>Establece tu objetivo mensual de consumo de agua</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="consumptionLimit">Límite de consumo (m³)</Label>
              <Input 
                id="consumptionLimit" 
                type="number" 
                value={consumptionLimit}
                onChange={(e) => setConsumptionLimit(Number(e.target.value))}
                placeholder="75"
              />
              <p className="text-xs text-gray-600">
                Basado en tu historial, tu promedio es de 65 m³/mes
              </p>
            </div>

            <div className="space-y-2">
              <Label>{t('goals.period', {defaultValue: 'Periodo'})}</Label>
              <div className="mobile-inline-grid grid grid-cols-3 gap-2">
                <Button variant={period === 'daily' ? 'default' : 'outline'} size="sm" onClick={() => setPeriod('daily')}>{t('goals.daily', {defaultValue: 'Diario'})}</Button>
                <Button variant={period === 'weekly' ? 'default' : 'outline'} size="sm" onClick={() => setPeriod('weekly')}>{t('goals.weekly', {defaultValue: 'Semanal'})}</Button>
                <Button variant={period === 'monthly' ? 'default' : 'outline'} size="sm" onClick={() => setPeriod('monthly')}>{t('goals.monthly', {defaultValue: 'Mensual'})}</Button>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <div className="flex items-start justify-between gap-3 text-sm">
                <span className="text-gray-600">Notificar al alcanzar</span>
                <span>80%</span>
              </div>
              <div className="flex items-start justify-between gap-3 text-sm">
                <span className="text-gray-600">Alerta crítica al alcanzar</span>
                <span>90%</span>
              </div>
            </div>

            <Button className="w-full" onClick={handleUpdateConsumptionGoal}>Actualizar Meta</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configurar Presupuesto</CardTitle>
            <CardDescription>Establece tu límite de gasto mensual</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="budgetLimit">Presupuesto mensual (COP)</Label>
              <Input 
                id="budgetLimit" 
                type="number" 
                value={budgetLimit}
                onChange={(e) => setBudgetLimit(Number(e.target.value))}
                placeholder="300000"
              />
              <p className="text-xs text-gray-600">
                Tu factura promedio es de $280,000/mes
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="waterRate">Tarifa de agua (COP/m³)</Label>
              <Input 
                id="waterRate" 
                type="number" 
                value={waterRate}
                onChange={(e) => setWaterRate(Number(e.target.value))}
                placeholder="3450"
              />
              <p className="text-xs text-gray-600">
                Ingresa la tarifa según tu recibo de agua
              </p>
            </div>

            <div className="pt-4 space-y-2">
              <div className="flex items-start justify-between gap-3 text-sm">
                <span className="text-gray-600">Notificar al alcanzar</span>
                <span>75%</span>
              </div>
              <div className="flex items-start justify-between gap-3 text-sm">
                <span className="text-gray-600">Alerta crítica al alcanzar</span>
                <span>90%</span>
              </div>
            </div>

            <Button className="w-full" onClick={handleUpdateBudgetGoal}>Actualizar Presupuesto</Button>
          </CardContent>
        </Card>
      </div>

      {/* Historial de metas */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Metas</CardTitle>
          <CardDescription>Seguimiento de tus objetivos anteriores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="size-5 text-green-600" />
                <div>
                  <div className="text-sm">Meta de Septiembre 2025</div>
                  <div className="text-xs text-gray-600">Límite: 75 m³ • Consumido: 68.5 m³</div>
                </div>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600">
                Cumplida
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="size-5 text-green-600" />
                <div>
                  <div className="text-sm">Meta de Agosto 2025</div>
                  <div className="text-xs text-gray-600">Límite: 80 m³ • Consumido: 72.3 m³</div>
                </div>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600">
                Cumplida
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <AlertCircle className="size-5 text-orange-600" />
                <div>
                  <div className="text-sm">Meta de Julio 2025</div>
                  <div className="text-xs text-gray-600">Límite: 75 m³ • Consumido: 82.1 m³</div>
                </div>
              </div>
              <Badge variant="outline" className="text-orange-600 border-orange-600">
                No cumplida
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RF30.2 - Progreso visual */}
      <Card>
        <CardHeader>
          <CardTitle>Proyección del Mes</CardTitle>
          <CardDescription>Estimación basada en tu consumo actual</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Calendar className="size-6 text-blue-600 mx-auto mb-2" />
                <div className="text-sm text-gray-600">Días transcurridos</div>
                <div className="text-2xl mt-1">24 / 30</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Target className="size-6 text-green-600 mx-auto mb-2" />
                <div className="text-sm text-gray-600">Proyección final</div>
                <div className="text-2xl mt-1">65.4 m³</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <TrendingDown className="size-6 text-purple-600 mx-auto mb-2" />
                <div className="text-sm text-gray-600">Ahorro proyectado</div>
                <div className="text-2xl mt-1">12.8%</div>
              </div>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm">¡Excelente progreso!</p>
                  <p className="text-xs text-gray-600 mt-1">
                    A este ritmo, terminarás el mes con 65.4 m³, cumpliendo tu meta y ahorrando aproximadamente $33,000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
