import { useState, useEffect, useCallback } from 'react';

export interface SensorReading {
  timestamp: Date;
  temperature: number;
  vibration: number;
  current: number;
}

export interface MachineStatus {
  health: number;
  status: 'normal' | 'warning' | 'critical';
  uptime: number;
  lastMaintenance: string;
  nextMaintenance: string;
  rpm: number;
  efficiency: number;
}

export interface Alert {
  id: string;
  type: 'warning' | 'critical' | 'info';
  message: string;
  sensor: string;
  value: number;
  threshold: number;
  timestamp: Date;
}

const TEMP_BASE = 65;
const VIBRATION_BASE = 2.5;
const CURRENT_BASE = 12;

function generateReading(time: Date): SensorReading {
  const hour = time.getHours();
  const loadFactor = 0.8 + 0.4 * Math.sin((hour - 6) * Math.PI / 12);
  
  return {
    timestamp: time,
    temperature: TEMP_BASE + loadFactor * 15 + (Math.random() - 0.5) * 8,
    vibration: VIBRATION_BASE + loadFactor * 1.5 + (Math.random() - 0.5) * 1.2,
    current: CURRENT_BASE + loadFactor * 5 + (Math.random() - 0.5) * 3,
  };
}

function generateHistorical(): SensorReading[] {
  const data: SensorReading[] = [];
  const now = new Date();
  for (let i = 96; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 15 * 60 * 1000);
    data.push(generateReading(time));
  }
  return data;
}

function generateAlerts(current: SensorReading): Alert[] {
  const alerts: Alert[] = [];
  
  if (current.temperature > 82) {
    alerts.push({
      id: `temp-${Date.now()}`,
      type: current.temperature > 90 ? 'critical' : 'warning',
      message: current.temperature > 90 ? 'Temperature critically high!' : 'Temperature above normal range',
      sensor: 'Temperature',
      value: current.temperature,
      threshold: current.temperature > 90 ? 90 : 82,
      timestamp: new Date(),
    });
  }
  
  if (current.vibration > 4.0) {
    alerts.push({
      id: `vib-${Date.now()}`,
      type: current.vibration > 5.5 ? 'critical' : 'warning',
      message: current.vibration > 5.5 ? 'Excessive vibration detected!' : 'Vibration above threshold',
      sensor: 'Vibration',
      value: current.vibration,
      threshold: current.vibration > 5.5 ? 5.5 : 4.0,
      timestamp: new Date(),
    });
  }
  
  if (current.current > 18) {
    alerts.push({
      id: `cur-${Date.now()}`,
      type: current.current > 22 ? 'critical' : 'warning',
      message: current.current > 22 ? 'Current draw critical!' : 'Current above normal',
      sensor: 'Current',
      value: current.current,
      threshold: current.current > 22 ? 22 : 18,
      timestamp: new Date(),
    });
  }
  
  return alerts;
}

export function useSensorData() {
  const [history, setHistory] = useState<SensorReading[]>(generateHistorical);
  const [current, setCurrent] = useState<SensorReading>(() => history[history.length - 1]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  
  const machineStatus: MachineStatus = {
    health: Math.max(0, Math.min(100, 
      100 - (current.temperature > 80 ? (current.temperature - 80) * 2 : 0)
      - (current.vibration > 4 ? (current.vibration - 4) * 8 : 0)
      - (current.current > 18 ? (current.current - 18) * 3 : 0)
    )),
    status: current.temperature > 90 || current.vibration > 5.5 || current.current > 22 
      ? 'critical' 
      : current.temperature > 82 || current.vibration > 4 || current.current > 18 
        ? 'warning' 
        : 'normal',
    uptime: 847.3,
    lastMaintenance: '2026-02-10',
    nextMaintenance: '2026-03-10',
    rpm: 1450 + Math.random() * 50,
    efficiency: 85 + Math.random() * 10,
  };

  const dismissAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const reading = generateReading(new Date());
      setCurrent(reading);
      setHistory(prev => [...prev.slice(-95), reading]);
      
      const newAlerts = generateAlerts(reading);
      if (newAlerts.length > 0) {
        setAlerts(prev => [...newAlerts, ...prev].slice(0, 20));
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return { current, history, machineStatus, alerts, dismissAlert };
}
