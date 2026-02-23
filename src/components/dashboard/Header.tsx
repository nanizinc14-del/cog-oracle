import { Activity, Wifi, WifiOff } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Header() {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex items-center justify-between border-b bg-card px-6 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 glow-primary">
          <Activity className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">PredictiveIQ</h1>
          <p className="text-[11px] text-muted-foreground">AI/ML Predictive Maintenance System</p>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 text-success">
            <Wifi className="h-3.5 w-3.5" />
            ESP32 Connected
          </span>
          <span className="text-muted-foreground">•</span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            Live
          </span>
        </div>
        <div className="font-mono text-sm text-muted-foreground">
          {time.toLocaleTimeString()}
        </div>
      </div>
    </header>
  );
}
