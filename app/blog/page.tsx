import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { posts } from "@/app/blog/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "ProofStack essays on proof-of-work hiring.",
};

export default function BlogPage() {
  return (
    <MarketingShell>
      <main>
        <section className="proof-grid border-b border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
            <Badge variant="outline">Field notes</Badge>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-normal md:text-6xl">
              Essays from the proof-of-work hiring frontier.
            </h1>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2">
            {posts.map((post, index) => (
              <Card
                className={index === 0 ? "border-foreground shadow-[8px_8px_0_rgb(var(--foreground))]" : "border-border shadow-none"}
                key={post.slug}
              >
                <CardHeader>
                  <div className="mb-4 grid size-10 place-items-center rounded-md bg-primary text-primary-foreground">
                    <Newspaper className="size-5" />
                  </div>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription className="text-base leading-7">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    href={`/blog/${post.slug}`}
                  >
                    Read essay
                    <ArrowRight className="size-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
