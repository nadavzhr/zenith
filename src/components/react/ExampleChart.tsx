import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import InteractiveCard from './InteractiveCard';

export interface ChartPoint {
  x: number | string;
  y: number;
}

interface ExampleChartProps {
  title?: string;
  subtitle?: string;
  data?: ChartPoint[];
}

const DEFAULT_DATA: ChartPoint[] = [
  { x: 1, y: 2 },
  { x: 2, y: 4 },
  { x: 3, y: 8 },
  { x: 4, y: 16 },
  { x: 5, y: 32 },
  { x: 6, y: 64 },
];
export default function ExampleChart({
  title = 'Example chart',
  subtitle = 'A Recharts line chart embedded as a hydrated React island.',
  data = DEFAULT_DATA,
}: ExampleChartProps) {
  return (
    <InteractiveCard title={title} subtitle={subtitle}>
      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
            <CartesianGrid stroke="var(--color-on-surface)" strokeOpacity={0.1} strokeDasharray="3 3" />
            <XAxis dataKey="x" stroke="var(--color-secondary)" fontSize={12} />
            <YAxis stroke="var(--color-secondary)" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-surface-container-high)',
                border: '1px solid var(--color-outline-variant)',
                borderRadius: 4,
                color: 'var(--color-on-surface)',
                fontSize: 12
              }}
            />
            <Line type="monotone" dataKey="y" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </InteractiveCard>
  );
}
