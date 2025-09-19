import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { inventoryItems, shipments, teamMembers } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { ShipmentStatus } from '@/lib/types';
import { Package, Truck, Users, AlertCircle } from 'lucide-react';

const kpis = [
  {
    title: 'Total Shipments',
    value: shipments.length,
    icon: Truck,
    color: 'text-blue-500',
  },
  {
    title: 'Items in Stock',
    value: inventoryItems.reduce((acc, item) => acc + item.quantity, 0),
    icon: Package,
    color: 'text-green-500',
  },
  {
    title: 'Team on Duty',
    value: teamMembers.filter((m) => m.status === 'On Job').length,
    icon: Users,
    color: 'text-yellow-500',
  },
  {
    title: 'Low Stock Items',
    value: inventoryItems.filter((item) => item.quantity < 100).length,
    icon: AlertCircle,
    color: 'text-red-500',
  },
];

const statusColors: Record<ShipmentStatus, string> = {
  Planning: 'bg-gray-200 text-gray-800',
  'In Transit': 'bg-blue-200 text-blue-800',
  Delivered: 'bg-green-200 text-green-800',
  Cancelled: 'bg-red-200 text-red-800',
  Delayed: 'bg-orange-200 text-orange-800',
};

const chartData = inventoryItems.map((item) => ({
  name: item.name,
  quantity: item.quantity,
}));

const chartConfig = {
  quantity: {
    label: 'Quantity',
    color: 'hsl(var(--primary))',
  },
};

export default function DashboardPage() {
  const recentShipments = shipments.slice(0, 5);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className={cn('h-4 w-4 text-muted-foreground', kpi.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Levels</CardTitle>
            <CardDescription>
              Current stock quantity for each item.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis />
                <Tooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="quantity" fill="var(--color-quantity)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Shipments</CardTitle>
            <CardDescription>
              An overview of the most recent shipments.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Shipment ID</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentShipments.map((shipment) => (
                  <TableRow key={shipment.id}>
                    <TableCell className="font-medium">{shipment.id}</TableCell>
                    <TableCell>{shipment.destination}</TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          'text-xs',
                          statusColors[shipment.status]
                        )}
                        variant="outline"
                      >
                        {shipment.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
