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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { shipments, teamMembers } from '@/lib/data';
import type { Shipment, ShipmentStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { PlusCircle } from 'lucide-react';

const statusColors: Record<ShipmentStatus, string> = {
  Planning: 'border-gray-500/50 bg-gray-500/10 text-gray-700 dark:text-gray-300',
  'In Transit': 'border-blue-500/50 bg-blue-500/10 text-blue-700 dark:text-blue-300',
  Delivered: 'border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-300',
  Cancelled: 'border-red-500/50 bg-red-500/10 text-red-700 dark:text-red-300',
  Delayed: 'border-orange-500/50 bg-orange-500/10 text-orange-700 dark:text-orange-300',
};

const getTeamMemberName = (id?: string) => {
  if (!id) return 'N/A';
  return teamMembers.find((m) => m.id === id)?.name || 'Unknown';
};

export default function ShipmentsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Shipments</CardTitle>
          <CardDescription>
            Manage and track all company shipments.
          </CardDescription>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Shipment
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Shipment ID</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Departure</TableHead>
              <TableHead>Est. Arrival</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Carpenter</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shipments.map((shipment) => (
              <TableRow key={shipment.id}>
                <TableCell className="font-medium">{shipment.id}</TableCell>
                <TableCell>{shipment.destination}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      'text-xs font-medium',
                      statusColors[shipment.status]
                    )}
                  >
                    {shipment.status}
                  </Badge>
                </TableCell>
                <TableCell>{shipment.departureDate}</TableCell>
                <TableCell>{shipment.arrivalDate}</TableCell>
                <TableCell>{getTeamMemberName(shipment.driverId)}</TableCell>
                <TableCell>{getTeamMemberName(shipment.carpenterId)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
