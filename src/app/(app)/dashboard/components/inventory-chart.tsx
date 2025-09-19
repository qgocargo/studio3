"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { inventoryItems } from '@/lib/data';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

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

export function InventoryChart() {
  return (
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
  );
}
