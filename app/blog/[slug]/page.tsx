import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { posts } from "@/app/blog/posts";

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = posts.find((item) => item.slug === params.slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = posts.find((item) => item.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <MarketingShell>
      <main>
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-4xl px-4 py-14 lg:px-8">
            <Badge variant="outline">ProofStack field note</Badge>
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-normal md:text-6xl">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">{post.description}</p>
          </div>
        </section>
        <article className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
          <div className="space-y-6 border-l-2 border-primary pl-6 text-lg leading-8">
            {post.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </main>
    </MarketingShell>
  );
}
