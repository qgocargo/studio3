"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { getMaterialRecommendations } from '../actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Wand2 className="mr-2 h-4 w-4" />
      )}
      Generate
    </Button>
  );
}

export function PlannerForm() {
  const { toast } = useToast();
  const [state, formAction] = useFormState(getMaterialRecommendations, {
    status: 'idle',
    message: '',
  });

  useEffect(() => {
    if (state.status === 'error') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Shipment Details</CardTitle>
          <CardDescription>
            Provide details about the shipment to get material recommendations.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="shipmentType">Shipment Type</Label>
                <Select name="shipmentType" required>
                  <SelectTrigger id="shipmentType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local Move</SelectItem>
                    <SelectItem value="international-sea">International (Sea)</SelectItem>
                    <SelectItem value="international-air">International (Air)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="shipmentSize">Shipment Size</Label>
                 <Select name="shipmentSize" required>
                  <SelectTrigger id="shipmentSize">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (1-2 rooms)</SelectItem>
                    <SelectItem value="medium">Medium (3-4 rooms)</SelectItem>
                    <SelectItem value="large">Large (5+ rooms)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="distance">Distance</Label>
              <Select name="distance" required>
                <SelectTrigger id="distance">
                  <SelectValue placeholder="Select distance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short (e.g., within city)</SelectItem>
                  <SelectItem value="medium">Medium (e.g., inter-state)</SelectItem>
                  <SelectItem value="long">Long (e.g., cross-country)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="itemsDescription">Items Description</Label>
              <Textarea
                id="itemsDescription"
                name="itemsDescription"
                placeholder="e.g., Standard household items, including a piano, several large paintings, and fragile glassware."
                rows={4}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialRequirements">Special Requirements (Optional)</Label>
              <Input
                id="specialRequirements"
                name="specialRequirements"
                placeholder="e.g., Temperature-controlled, custom crating needed"
              />
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
      
      <div className="space-y-4">
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>AI Recommendations</CardTitle>
              <CardDescription>
                Optimized material list generated by AI.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {state.status === 'loading' && (
              <div className="flex items-center justify-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
            {state.status === 'success' && state.data && (
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-semibold text-base mb-2">Recommended Materials:</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">{state.data.recommendedMaterials}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-2">Justification:</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">{state.data.justification}</p>
                </div>
              </div>
            )}
            {state.status === 'idle' && (
              <div className="flex flex-col items-center justify-center h-40 text-center text-muted-foreground">
                <p>Your recommendations will appear here.</p>
              </div>
            )}
             {state.status === 'error' && (
              <div className="flex flex-col items-center justify-center h-40 text-center text-destructive">
                <p>Could not generate recommendations.</p>
                <p className="text-xs">{state.message}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
