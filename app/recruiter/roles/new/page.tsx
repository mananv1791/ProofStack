import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SurfacePage } from "@/components/app-shell/surface-page";

export default function NewRolePage() {
  return (
    <SurfacePage
      description="The Milestone 0 form captures the fields needed by the schema; persistence lands once Supabase is connected."
      eyebrow="New role"
      title="Describe the work a great candidate has already done."
    >
      <Card className="max-w-3xl border-border shadow-none">
        <CardHeader>
          <CardTitle>Role details</CardTitle>
          <CardDescription>Salary range is intentionally required by the product spec.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Senior full-stack engineer" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seniority">Seniority</Label>
            <Input id="seniority" placeholder="senior" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="salary-min">Salary min</Label>
            <Input id="salary-min" placeholder="160000" type="number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="salary-max">Salary max</Label>
            <Input id="salary-max" placeholder="220000" type="number" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="ideal">What would a great candidate have built?</Label>
            <Textarea
              id="ideal"
              placeholder="A production realtime system with thoughtful failure handling, tenant isolation, and clear operational trade-offs."
            />
          </div>
          <div className="md:col-span-2">
            <Button disabled>Persist role after Supabase setup</Button>
          </div>
        </CardContent>
      </Card>
    </SurfacePage>
  );
}
