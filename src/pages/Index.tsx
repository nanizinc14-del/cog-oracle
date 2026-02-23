import { Thermometer, Gauge, Zap } from 'lucide-react';
import { Header } from '@/components/dashboard/Header';
import { SensorGauge } from '@/components/dashboard/SensorGauge';
import { SensorChart } from '@/components/dashboard/SensorChart';
import { AlertsPanel } from '@/components/dashboard/AlertsPanel';
import { DigitalTwin } from '@/components/dashboard/DigitalTwin';
import { HealthScore } from '@/components/dashboard/HealthScore';
import { useSensorData } from '@/hooks/useSensorData';

const Index = () => {
  const { current, history, machineStatus, alerts, dismissAlert } = useSensorData();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-1 p-4 lg:p-6">
        <div className="mx-auto max-w-7xl space-y-4 lg:space-y-6">
          {/* Sensor Gauges Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <SensorGauge
              label="Temperature"
              value={current.temperature}
              unit="°C"
              min={0}
              max={120}
              warningThreshold={82}
              criticalThreshold={90}
              icon={<Thermometer className="h-3.5 w-3.5" />}
            />
            <SensorGauge
              label="Vibration"
              value={current.vibration}
              unit="mm/s"
              min={0}
              max={8}
              warningThreshold={4}
              criticalThreshold={5.5}
              icon={<Gauge className="h-3.5 w-3.5" />}
            />
            <SensorGauge
              label="Current"
              value={current.current}
              unit="A"
              min={0}
              max={30}
              warningThreshold={18}
              criticalThreshold={22}
              icon={<Zap className="h-3.5 w-3.5" />}
            />
          </div>

          {/* Charts + Side panels */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
            {/* Charts column */}
            <div className="space-y-4 lg:col-span-2">
              <SensorChart
                data={history}
                dataKey="temperature"
                label="Temperature History (24h)"
                unit="°C"
                color="hsl(187, 80%, 45%)"
                warningThreshold={82}
                criticalThreshold={90}
              />
              <SensorChart
                data={history}
                dataKey="vibration"
                label="Vibration History (24h)"
                unit="mm/s"
                color="hsl(38, 92%, 50%)"
                warningThreshold={4}
                criticalThreshold={5.5}
              />
              <SensorChart
                data={history}
                dataKey="current"
                label="Current Draw History (24h)"
                unit="A"
                color="hsl(142, 70%, 45%)"
                warningThreshold={18}
                criticalThreshold={22}
              />
            </div>

            {/* Side panels */}
            <div className="space-y-4">
              <HealthScore status={machineStatus} />
              <DigitalTwin status={machineStatus} current={current} />
              <AlertsPanel alerts={alerts} onDismiss={dismissAlert} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
