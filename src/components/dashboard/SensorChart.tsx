import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { SensorReading } from '@/hooks/useSensorData';

interface SensorChartProps {
  data: SensorReading[];
  dataKey: 'temperature' | 'vibration' | 'current';
  label: string;
  unit: string;
  color: string;
  warningThreshold: number;
  criticalThreshold: number;
}

export function SensorChart({ data, dataKey, label, unit, color, warningThreshold, criticalThreshold }: SensorChartProps) {
  const chartData = data.map(d => ({
    time: d.timestamp instanceof Date ? d.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
    [dataKey]: Number(d[dataKey].toFixed(2)),
    warning: warningThreshold,
    critical: criticalThreshold,
  }));

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-card-foreground">{label}</h3>
        <span className="font-mono text-xs text-muted-foreground">{unit}</span>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
          <XAxis 
            dataKey="time" 
            tick={{ fill: 'hsl(215 15% 50%)', fontSize: 10, fontFamily: 'JetBrains Mono' }} 
            interval={Math.floor(chartData.length / 6)}
            axisLine={{ stroke: 'hsl(220 15% 18%)' }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fill: 'hsl(215 15% 50%)', fontSize: 10, fontFamily: 'JetBrains Mono' }}
            axisLine={{ stroke: 'hsl(220 15% 18%)' }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(220 18% 10%)',
              border: '1px solid hsl(220 15% 18%)',
              borderRadius: '8px',
              fontFamily: 'JetBrains Mono',
              fontSize: 12,
              color: 'hsl(210 20% 90%)',
            }}
          />
          <Area
            type="monotone"
            dataKey="warning"
            stroke="hsl(38 92% 50%)"
            strokeDasharray="4 4"
            strokeWidth={1}
            fill="none"
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="critical"
            stroke="hsl(0 72% 55%)"
            strokeDasharray="4 4"
            strokeWidth={1}
            fill="none"
            dot={false}
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            fill={`url(#gradient-${dataKey})`}
            dot={false}
            animationDuration={300}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
