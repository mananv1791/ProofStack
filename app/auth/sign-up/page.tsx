import Link from "next/link";
import type { Metadata } from "next";
import { BriefcaseBusiness, GitBranch, Mail, Sparkles } from "lucide-react";
import { sendMagicLink, signInWithGithub } from "@/app/auth/actions";
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
import { isSupabaseConfigured } from "@/lib/env";

export const metadata: Metadata = {
  title: "Create account | ProofStack",
  description: "Create a candidate or recruiter ProofStack account.",
};

type SignUpPageProps = {
  searchParams?: {
    error?: string;
  };
};

const signupOptions = [
  {
    role: "candidate",
    title: "Candidate",
    description: "Build a portable dossier from work you already shipped.",
    icon: Sparkles,
    emailPlaceholder: "you@example.com",
  },
  {
    role: "recruiter",
    title: "Recruiter",
    description: "Use a work email to review evidence-backed candidates.",
    icon: BriefcaseBusiness,
    emailPlaceholder: "you@company.com",
  },
] as const;

export default function SignUpPage({ searchParams }: SignUpPageProps) {
  const supabaseReady = isSupabaseConfigured();

  return (
    <main className="min-h-screen bg-muted/40 px-4 py-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-mono text-sm font-semibold tracking-normal">
            ProofStack
          </Link>
          <Badge variant={supabaseReady ? "secondary" : "outline"}>
            {supabaseReady ? "Auth ready" : "Env needed"}
          </Badge>
        </div>

        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase text-primary">Private beta</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal md:text-5xl">
            Choose the side of the market you are joining.
          </h1>
          <p className="mt-3 text-muted-foreground">
            Candidate accounts are free forever. Recruiter accounts require
            company verification before dossier search is unlocked.
          </p>
        </div>

        {searchParams?.error ? (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {searchParams.error}
          </div>
        ) : null}

        {!supabaseReady ? (
          <div className="rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
            Supabase keys are not configured yet, so live sign-up buttons are
            disabled. The route and dashboard foundation is still available for
            review.
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          {signupOptions.map((option) => {
            const Icon = option.icon;

            return (
              <Card key={option.role} className="border-border shadow-none">
                <CardHeader>
                  <div className="mb-4 flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle>{option.title}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form action={signInWithGithub}>
                    <input type="hidden" name="role" value={option.role} />
                    <input type="hidden" name="mode" value="sign-up" />
                    <Button className="w-full" disabled={!supabaseReady} type="submit">
                      <GitBranch className="size-4" />
                      Sign up with GitHub
                    </Button>
                  </form>

                  <form action={sendMagicLink} className="space-y-3">
                    <input type="hidden" name="role" value={option.role} />
                    <input type="hidden" name="mode" value="sign-up" />
                    <div className="space-y-2">
                      <Label htmlFor={`${option.role}-email`}>Email</Label>
                      <Input
                        id={`${option.role}-email`}
                        name="email"
                        placeholder={option.emailPlaceholder}
                        type="email"
                      />
                    </div>
                    <Button
                      className="w-full"
                      disabled={!supabaseReady}
                      type="submit"
                      variant="outline"
                    >
                      <Mail className="size-4" />
                      Email me a link
                    </Button>
                  </form>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link className="font-medium text-foreground underline-offset-4 hover:underline" href="/auth/sign-in">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
