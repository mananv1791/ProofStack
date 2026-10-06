import type { Metadata } from "next";
import { ArrowRight, Clock3, FileSearch, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MarketingShell } from "@/components/marketing/marketing-shell";

export const metadata: Metadata = {
  title: "Waitlist",
  description: "Join the ProofStack private beta waitlist.",
};

export default function WaitlistPage() {
  return (
    <MarketingShell>
      <main className="proof-grid">
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1fr_460px] lg:px-8">
          <div className="flex flex-col justify-center">
            <Badge className="w-fit" variant="outline">
              Private beta intake
            </Badge>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-normal md:text-6xl">
              Join the teams replacing resume review with proof packets.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Candidates get a portable dossier. Recruiters get early access to
              evidence-backed search. Design partners help calibrate the
              interview engine before the wider launch.
            </p>
            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                { icon: FileSearch, label: "Dossier beta" },
                { icon: Clock3, label: "Weekly invites" },
                { icon: Sparkles, label: "Founder-led setup" },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div className="border border-border bg-card p-4" key={item.label}>
                    <Icon className="size-5 text-primary" />
                    <p className="mt-3 text-sm font-medium">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <Card className="clip-corner border-foreground bg-card shadow-[10px_10px_0_rgb(var(--foreground))]">
            <CardHeader>
              <CardTitle>Request access</CardTitle>
              <CardDescription>
                This form posts to the Supabase-ready waitlist endpoint.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action="/api/waitlist" className="space-y-4" method="post">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" placeholder="you@company.com" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select name="role">
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Choose one" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="candidate">Candidate</SelectItem>
                      <SelectItem value="recruiter">Recruiter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" name="company" placeholder="Optional" />
                </div>
                <Button className="w-full" type="submit">
                  Request access
                  <ArrowRight className="size-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
    </MarketingShell>
  );
}
