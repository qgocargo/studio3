import type { TeamMember, InventoryItem, Shipment } from './types';

export const teamMembers: TeamMember[] = [
  { id: '1', name: 'Alice Johnson', role: 'Supervisor', avatarUrl: 'https://picsum.photos/seed/1/100/100', imageHint: 'woman smiling', status: 'Available' },
  { id: '2', name: 'Bob Williams', role: 'Driver', avatarUrl: 'https://picsum.photos/seed/2/100/100', imageHint: 'man cap', status: 'On Job' },
  { id: '3', name: 'Charlie Brown', role: 'Carpenter', avatarUrl: 'https://picsum.photos/seed/3/100/100', imageHint: 'man hardhat', status: 'Available' },
  { id: '4', name: 'Diana Miller', role: 'Laborer', avatarUrl: 'https://picsum.photos/seed/4/100/100', imageHint: 'woman ponytail', status: 'On Job' },
  { id: '5', name: 'Ethan Davis', role: 'Laborer', avatarUrl: 'https://picsum.photos/seed/5/100/100', imageHint: 'man beard', status: 'On Leave' },
  { id: '6', name: 'Fiona Clark', role: 'Driver', avatarUrl: 'https://picsum.photos/seed/6/100/100', imageHint: 'woman sunglasses', status: 'Available' },
];

export const inventoryItems: InventoryItem[] = [
  { id: 'item-001', name: 'Small Box', sku: 'BOX-S', quantity: 250, category: 'Boxes', lastUpdated: '2024-05-20' },
  { id: 'item-002', name: 'Medium Box', sku: 'BOX-M', quantity: 150, category: 'Boxes', lastUpdated: '2024-05-20' },
  { id: 'item-003', name: 'Large Box', sku: 'BOX-L', quantity: 95, category: 'Boxes', lastUpdated: '2024-05-18' },
  { id: 'item-004', name: 'Packing Tape', sku: 'TAPE-01', quantity: 300, category: 'Packing Materials', lastUpdated: '2024-05-19' },
  { id: 'item-005', name: 'Bubble Wrap', sku: 'WRAP-BUB', quantity: 80, category: 'Packing Materials', lastUpdated: '2024-05-19' },
  { id: 'item-006', name: 'Drill Set', sku: 'TOOL-DRL', quantity: 15, category: 'Tools', lastUpdated: '2024-05-15' },
  { id: 'item-007', name: 'Furniture Dollies', sku: 'MISC-DOL', quantity: 25, category: 'Miscellaneous', lastUpdated: '2024-05-12' },
];

export const shipments: Shipment[] = [
  { id: 'QG-84621', destination: 'New York, NY', status: 'Delivered', departureDate: '2024-05-01', arrivalDate: '2024-05-05', driverId: '2', carpenterId: '3' },
  { id: 'QG-95135', destination: 'London, UK', status: 'In Transit', departureDate: '2024-05-15', arrivalDate: '2024-05-25', driverId: '6' },
  { id: 'QG-73248', destination: 'San Francisco, CA', status: 'Planning', departureDate: '2024-06-01', arrivalDate: '2024-06-05' },
  { id: 'QG-61984', destination: 'Tokyo, JP', status: 'Delayed', departureDate: '2024-05-10', arrivalDate: '2024-05-22', driverId: '2' },
  { id: 'QG-58742', destination: 'Chicago, IL', status: 'Cancelled', departureDate: '2024-05-18', arrivalDate: '2024-05-20' },
  { id: 'QG-13289', destination: 'Paris, FR', status: 'In Transit', departureDate: '2024-05-22', arrivalDate: '2024-06-01', driverId: '6', carpenterId: '3'},
];
