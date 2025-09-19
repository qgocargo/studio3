// optimize-shipment-materials.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow to optimize the quantity of of materials for a shipment.
 *
 * - optimizeShipmentMaterials - A function that takes shipment details and returns recommended material quantities.
 * - OptimizeShipmentMaterialsInput - The input type for the optimizeShipmentMaterials function.
 * - OptimizeShipmentMaterialsOutput - The return type for the optimizeShipmentMaterials function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeShipmentMaterialsInputSchema = z.object({
  shipmentType: z
    .string()
    .describe(
      'The type of shipment (e.g., local move, international move - sea, international move - air).'
    ),
  shipmentSize: z
    .string()
    .describe(
      'The size of the shipment (e.g., small, medium, large), which relates to the volume of items to be packed.'
    ),
  itemsDescription: z
    .string()
    .describe(
      'A detailed description of the items being shipped, including their fragility and packing requirements.'
    ),
  distance: z
    .string()
    .describe(
      'The distance the shipment will travel (e.g., short, medium, long).'
    ),
  specialRequirements: z
    .string()
    .optional()
    .describe(
      'Any special packing or handling requirements, such as fragile items or temperature-sensitive goods.'
    ),
});

export type OptimizeShipmentMaterialsInput = z.infer<
  typeof OptimizeShipmentMaterialsInputSchema
>;

const OptimizeShipmentMaterialsOutputSchema = z.object({
  recommendedMaterials: z
    .string()
    .describe(
      'A list of recommended packing materials and their quantities, optimized for the specific shipment details.'
    ),
  justification: z
    .string()
    .describe(
      'A brief explanation of why these materials and quantities are recommended, considering factors like shipment type, size, and item fragility.'
    ),
});

export type OptimizeShipmentMaterialsOutput = z.infer<
  typeof OptimizeShipmentMaterialsOutputSchema
>;

export async function optimizeShipmentMaterials(
  input: OptimizeShipmentMaterialsInput
): Promise<OptimizeShipmentMaterialsOutput> {
  return optimizeShipmentMaterialsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeShipmentMaterialsPrompt',
  input: {schema: OptimizeShipmentMaterialsInputSchema},
  output: {schema: OptimizeShipmentMaterialsOutputSchema},
  prompt: `You are an AI assistant that suggests optimal packing material quantities for shipments to reduce waste and ensure sufficient supplies.

  Consider the following shipment details:
  - Shipment Type: {{{shipmentType}}}
  - Shipment Size: {{{shipmentSize}}}
  - Items Description: {{{itemsDescription}}}
  - Distance: {{{distance}}}
  - Special Requirements: {{{specialRequirements}}}

  Based on these details, provide a list of recommended packing materials and their quantities, as well as a justification for your recommendations.
  Format the response as follows:
  Recommended Materials: [material]: [quantity], [material]: [quantity], ...
  Justification: [explanation]`,
});

const optimizeShipmentMaterialsFlow = ai.defineFlow(
  {
    name: 'optimizeShipmentMaterialsFlow',
    inputSchema: OptimizeShipmentMaterialsInputSchema,
    outputSchema: OptimizeShipmentMaterialsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
