import { PlannerForm } from './components/planner-form';

export default function PlannerPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Shipment Planning Tool
        </h1>
        <p className="text-muted-foreground">
          Use AI to recommend the quantity of materials for each shipment.
        </p>
      </div>
      <PlannerForm />
    </div>
  );
}
