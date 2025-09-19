"use server";

import {
  optimizeShipmentMaterials,
  type OptimizeShipmentMaterialsInput,
  type OptimizeShipmentMaterialsOutput,
} from '@/ai/flows/optimize-shipment-materials';
import { z } from 'zod';

const formSchema = z.object({
  shipmentType: z.string().min(1, 'Shipment type is required'),
  shipmentSize: z.string().min(1, 'Shipment size is required'),
  itemsDescription: z.string().min(10, 'Please provide a more detailed description.'),
  distance: z.string().min(1, 'Distance is required'),
  specialRequirements: z.string().optional(),
});

type State = {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
  data?: OptimizeShipmentMaterialsOutput;
};

export async function getMaterialRecommendations(
  prevState: State,
  formData: FormData
): Promise<State> {
  const parsed = formSchema.safeParse({
    shipmentType: formData.get('shipmentType'),
    shipmentSize: formData.get('shipmentSize'),
    itemsDescription: formData.get('itemsDescription'),
    distance: formData.get('distance'),
    specialRequirements: formData.get('specialRequirements'),
  });

  if (!parsed.success) {
    return {
      status: 'error',
      message: parsed.error.errors.map((e) => e.message).join(', '),
    };
  }

  try {
    const result = await optimizeShipmentMaterials(parsed.data as OptimizeShipmentMaterialsInput);
    return {
      status: 'success',
      message: 'Recommendations generated successfully.',
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      message: 'An error occurred while generating recommendations. Please try again.',
    };
  }
}
