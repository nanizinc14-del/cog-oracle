import type { MachineStatus } from '@/hooks/useSensorData';

interface HealthScoreProps {
  status: MachineStatus;
}

export function HealthScore({ status }: HealthScoreProps) {
  const health = Math.round(status.health);
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (health / 100) * circumference;
  
  const color = health > 70 ? 'hsl(var(--success))' : health > 40 ? 'hsl(var(--warning))' : 'hsl(var(--destructive))';
  const label = health > 70 ? 'HEALTHY' : health > 40 ? 'DEGRADED' : 'CRITICAL';
  const textColor = health > 70 ? 'text-success' : health > 40 ? 'text-warning' : 'text-destructive';

  return (
    <div className="flex flex-col items-center rounded-lg border bg-card p-4">
      <h3 className="mb-3 text-sm font-medium text-card-foreground">Machine Health</h3>
      
      <div className="relative h-32 w-32">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
          <circle
            cx="60" cy="60" r="52"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-mono text-3xl font-bold ${textColor} text-glow-primary`}>
            {health}
          </span>
          <span className="text-[10px] text-muted-foreground">/ 100</span>
        </div>
      </div>
      
      <span className={`mt-2 rounded-full px-3 py-1 text-xs font-semibold ${textColor} bg-secondary`}>
        {label}
      </span>
      
      <div className="mt-3 w-full space-y-1 text-xs">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Last Maintenance</span>
          <span className="font-mono text-foreground">{status.lastMaintenance}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Next Scheduled</span>
          <span className="font-mono text-foreground">{status.nextMaintenance}</span>
        </div>
      </div>
    </div>
  );
}
