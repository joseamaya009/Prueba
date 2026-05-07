import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function WeeklyConsumptionChart() {
  const data = useMemo(() => [
    { day: 'Lun', consumption: 2.1 },
    { day: 'Mar', consumption: 2.4 },
    { day: 'Mié', consumption: 2.2 },
    { day: 'Jue', consumption: 2.8 },
    { day: 'Vie', consumption: 2.3 },
    { day: 'Sáb', consumption: 3.1 },
    { day: 'Dom', consumption: 2.9 },
  ], []);

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={250} id="weekly-chart-container">
      <BarChart
        data={data}
        margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
        id="weekly-bar-chart-svg"
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="day"
          stroke="#6b7280"
          style={{ fontSize: '12px' }}
        />
        <YAxis
          stroke="#6b7280"
          style={{ fontSize: '12px' }}
        />
        <Tooltip
          contentStyle={{
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            backgroundColor: 'white'
          }}
        />
        <Bar
          dataKey="consumption"
          fill="#3b82f6"
          name="Consumo (m³)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
