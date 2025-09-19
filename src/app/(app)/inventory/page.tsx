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
import { inventoryItems } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const getStockBadge = (quantity: number) => {
  if (quantity === 0) {
    return (
      <Badge variant="destructive" className="text-xs">
        Out of Stock
      </Badge>
    );
  }
  if (quantity < 100) {
    return (
      <Badge variant="secondary" className="bg-orange-200 text-orange-800 dark:bg-orange-800 dark:text-orange-200 text-xs">
        Low Stock
      </Badge>
    );
  }
  return (
    <Badge variant="secondary" className="bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200 text-xs">
      In Stock
    </Badge>
  );
};

export default function InventoryPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Inventory</CardTitle>
          <CardDescription>
            Track and manage warehouse inventory levels.
          </CardDescription>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Item Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-mono text-xs">{item.sku}</TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{item.category}</Badge>
                </TableCell>
                <TableCell className="text-right font-medium">{item.quantity}</TableCell>
                <TableCell className="text-center">
                  {getStockBadge(item.quantity)}
                </TableCell>
                <TableCell>{item.lastUpdated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
