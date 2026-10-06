import Link from "next/link";
import type { Metadata } from "next";
import { GitBranch, LogIn, Mail } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { isSupabaseConfigured } from "@/lib/env";

export const metadata: Metadata = {
  title: "Sign in | ProofStack",
  description: "Sign in to your ProofStack workspace.",
};

type SignInPageProps = {
  searchParams?: {
    error?: string;
    next?: string;
    notice?: string;
  };
};

export default function SignInPage({ searchParams }: SignInPageProps) {
  const supabaseReady = isSupabaseConfigured();

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <Card className="w-full max-w-md border-border shadow-none">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="font-mono text-sm font-semibold tracking-normal">
              ProofStack
            </Link>
            <Badge variant={supabaseReady ? "secondary" : "outline"}>
              {supabaseReady ? "Auth ready" : "Env needed"}
            </Badge>
          </div>
          <div>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Continue with GitHub or use a secure email link.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {searchParams?.error ? (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {searchParams.error}
            </div>
          ) : null}

          {searchParams?.notice ? (
            <div className="rounded-md border border-accent/30 bg-accent/10 px-3 py-2 text-sm text-accent">
              {searchParams.notice}
            </div>
          ) : null}

          {!supabaseReady ? (
            <div className="rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
              Add Supabase keys to enable live authentication. The product
              routes remain available locally for foundation review.
            </div>
          ) : null}

          <form action={signInWithGithub}>
            <input type="hidden" name="role" value="candidate" />
            <input type="hidden" name="mode" value="sign-in" />
            <input type="hidden" name="next" value={searchParams?.next ?? ""} />
            <Button className="w-full" disabled={!supabaseReady} size="lg" type="submit">
              <GitBranch className="size-4" />
              Continue with GitHub
            </Button>
          </form>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs uppercase text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          <form action={sendMagicLink} className="space-y-3">
            <input type="hidden" name="role" value="candidate" />
            <input type="hidden" name="mode" value="sign-in" />
            <input type="hidden" name="next" value={searchParams?.next ?? ""} />
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" placeholder="you@company.com" type="email" />
            </div>
            <Button className="w-full" disabled={!supabaseReady} size="lg" type="submit">
              <Mail className="size-4" />
              Send magic link
            </Button>
          </form>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>New to ProofStack?</span>
            <Button asChild size="sm" variant="ghost">
              <Link href="/auth/sign-up">
                <LogIn className="size-4" />
                Create account
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
