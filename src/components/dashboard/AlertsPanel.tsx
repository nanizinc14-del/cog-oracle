import { AlertTriangle, X, Info, AlertCircle } from 'lucide-react';
import type { Alert } from '@/hooks/useSensorData';

interface AlertsPanelProps {
  alerts: Alert[];
  onDismiss: (id: string) => void;
}

export function AlertsPanel({ alerts, onDismiss }: AlertsPanelProps) {
  const iconMap = {
    critical: <AlertCircle className="h-4 w-4 text-destructive" />,
    warning: <AlertTriangle className="h-4 w-4 text-warning" />,
    info: <Info className="h-4 w-4 text-primary" />,
  };

  const borderMap = {
    critical: 'border-l-destructive',
    warning: 'border-l-warning',
    info: 'border-l-primary',
  };

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-medium text-card-foreground">
          <AlertTriangle className="h-4 w-4 text-warning" />
          Active Alerts
        </h3>
        <span className="rounded-full bg-destructive/20 px-2 py-0.5 font-mono text-xs text-destructive">
          {alerts.length}
        </span>
      </div>
      
      <div className="max-h-[300px] space-y-2 overflow-y-auto pr-1">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center py-8 text-muted-foreground">
            <Info className="mb-2 h-8 w-8 opacity-30" />
            <p className="text-sm">No active alerts</p>
          </div>
        ) : (
          alerts.map(alert => (
            <div
              key={alert.id}
              className={`flex items-start gap-3 rounded border-l-2 bg-secondary/50 p-3 ${borderMap[alert.type]}`}
            >
              {iconMap[alert.type]}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-card-foreground">{alert.message}</p>
                <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                  {alert.sensor}: {alert.value.toFixed(1)} (threshold: {alert.threshold})
                </p>
                <p className="font-mono text-[10px] text-muted-foreground">
                  {alert.timestamp.toLocaleTimeString()}
                </p>
              </div>
              <button onClick={() => onDismiss(alert.id)} className="text-muted-foreground hover:text-foreground">
                <X className="h-3 w-3" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
