export type UserRole = 'Supervisor' | 'Carpenter' | 'Driver' | 'Laborer';

export type TeamMember = {
  id: string;
  name: string;
  role: UserRole;
  avatarUrl: string;
  imageHint: string;
  status: 'Available' | 'On Job' | 'On Leave';
};

export type InventoryItem = {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  category: 'Boxes' | 'Packing Materials' | 'Tools' | 'Miscellaneous';
  lastUpdated: string;
};

export type ShipmentStatus = 'Planning' | 'In Transit' | 'Delivered' | 'Cancelled' | 'Delayed';

export type Shipment = {
  id: string;
  destination: string;
  status: ShipmentStatus;
  departureDate: string;
  arrivalDate: string;
  driverId?: string;
  carpenterId?: string;
};
