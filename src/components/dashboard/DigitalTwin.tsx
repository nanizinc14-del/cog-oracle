import type { MachineStatus, SensorReading } from '@/hooks/useSensorData';
import { Activity, Zap, Thermometer, Gauge } from 'lucide-react';

interface DigitalTwinProps {
  status: MachineStatus;
  current: SensorReading;
}

export function DigitalTwin({ status, current }: DigitalTwinProps) {
  const statusColor = {
    normal: 'text-success',
    warning: 'text-warning',
    critical: 'text-destructive',
  };

  const statusGlow = {
    normal: 'shadow-[0_0_30px_hsl(142_70%_45%/0.2)]',
    warning: 'shadow-[0_0_30px_hsl(38_92%_50%/0.2)]',
    critical: 'shadow-[0_0_30px_hsl(0_72%_55%/0.2)]',
  };

  return (
    <div className="rounded-lg border bg-card p-4">
      <h3 className="mb-4 text-sm font-medium text-card-foreground">Digital Twin — Motor Assembly</h3>
      
      <div className={`relative mx-auto rounded-xl border bg-secondary/30 p-6 transition-shadow duration-500 ${statusGlow[status.status]}`}>
        {/* Machine visualization */}
        <div className="grid-pattern absolute inset-0 rounded-xl opacity-30" />
        
        <div className="relative flex flex-col items-center gap-4">
          {/* Motor body */}
          <div className="relative flex h-28 w-44 items-center justify-center rounded-lg border-2 border-muted bg-card">
            <div className={`absolute -left-3 top-1/2 h-8 w-3 -translate-y-1/2 rounded-l border ${status.status === 'critical' ? 'bg-destructive/30 border-destructive/50' : 'bg-primary/20 border-primary/30'}`} />
            <div className={`absolute -right-6 top-1/2 h-4 w-6 -translate-y-1/2 rounded-r border ${status.status === 'normal' ? 'bg-primary/20 border-primary/30' : 'bg-warning/20 border-warning/30'}`} />
            
            <div className="text-center">
              <Activity className={`mx-auto mb-1 h-6 w-6 ${statusColor[status.status]} ${status.status === 'critical' ? 'animate-pulse' : ''}`} />
              <span className="font-mono text-lg font-bold text-foreground">{status.rpm.toFixed(0)}</span>
              <span className="block text-[10px] text-muted-foreground">RPM</span>
            </div>

            {/* Sensor indicators */}
            <div className="absolute -top-2 left-4 flex items-center gap-1 rounded bg-card px-1.5 py-0.5 text-[9px]">
              <Thermometer className="h-3 w-3 text-primary" />
              <span className="font-mono text-primary">{current.temperature.toFixed(1)}°C</span>
            </div>
            <div className="absolute -bottom-2 left-4 flex items-center gap-1 rounded bg-card px-1.5 py-0.5 text-[9px]">
              <Gauge className="h-3 w-3 text-warning" />
              <span className="font-mono text-warning">{current.vibration.toFixed(2)} mm/s</span>
            </div>
            <div className="absolute -bottom-2 right-4 flex items-center gap-1 rounded bg-card px-1.5 py-0.5 text-[9px]">
              <Zap className="h-3 w-3 text-success" />
              <span className="font-mono text-success">{current.current.toFixed(1)} A</span>
            </div>
          </div>

          {/* Status info row */}
          <div className="grid w-full grid-cols-3 gap-2 text-center">
            <div className="rounded border bg-card p-2">
              <p className="text-[10px] text-muted-foreground">Efficiency</p>
              <p className="font-mono text-sm font-semibold text-foreground">{status.efficiency.toFixed(1)}%</p>
            </div>
            <div className="rounded border bg-card p-2">
              <p className="text-[10px] text-muted-foreground">Uptime</p>
              <p className="font-mono text-sm font-semibold text-foreground">{status.uptime}h</p>
            </div>
            <div className="rounded border bg-card p-2">
              <p className="text-[10px] text-muted-foreground">Next Maint.</p>
              <p className="font-mono text-sm font-semibold text-foreground">14d</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
