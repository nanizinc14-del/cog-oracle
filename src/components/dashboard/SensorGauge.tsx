import { useEffect, useRef } from 'react';

interface SensorGaugeProps {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  warningThreshold: number;
  criticalThreshold: number;
  icon: React.ReactNode;
}

export function SensorGauge({ label, value, unit, min, max, warningThreshold, criticalThreshold, icon }: SensorGaugeProps) {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const angle = (percentage / 100) * 270 - 135;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference * 0.75;
  
  const status = value >= criticalThreshold ? 'critical' : value >= warningThreshold ? 'warning' : 'normal';
  
  const statusColors = {
    normal: 'text-primary',
    warning: 'text-warning',
    critical: 'text-destructive',
  };

  const glowClasses = {
    normal: 'glow-primary',
    warning: 'glow-warning',
    critical: 'glow-danger',
  };

  return (
    <div className={`relative flex flex-col items-center rounded-lg border bg-card p-4 transition-all duration-500 ${glowClasses[status]}`}>
      <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {icon}
        {label}
      </div>
      
      <div className="relative h-32 w-32">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-[135deg]">
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="6"
            strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
            strokeLinecap="round"
          />
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke={status === 'critical' ? 'hsl(var(--destructive))' : status === 'warning' ? 'hsl(var(--warning))' : 'hsl(var(--primary))'}
            strokeWidth="6"
            strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-mono text-2xl font-bold ${statusColors[status]} transition-colors duration-300`}>
            {value.toFixed(1)}
          </span>
          <span className="text-xs text-muted-foreground">{unit}</span>
        </div>
      </div>
      
      <div className="mt-1 flex w-full justify-between px-2 font-mono text-[10px] text-muted-foreground">
        <span>{min}</span>
        <span className={`text-xs font-medium ${statusColors[status]}`}>
          {status === 'critical' ? '⚠ CRITICAL' : status === 'warning' ? '⚠ WARNING' : '● NORMAL'}
        </span>
        <span>{max}</span>
      </div>
    </div>
  );
}
