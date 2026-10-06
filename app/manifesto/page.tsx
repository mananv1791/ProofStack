import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { MarketingShell } from "@/components/marketing/marketing-shell";

export const metadata: Metadata = {
  title: "Manifesto",
  description: "Why the resume is dead and what replaces it.",
};

const sections = [
  {
    title: "The resume was a workaround.",
    body: "It compressed a career into schools, logos, dates, and keywords because the work itself was hard to inspect. That bargain no longer holds.",
  },
  {
    title: "The old filters are now synthetic.",
    body: "AI can generate a convincing resume faster than a recruiter can read one. When every summary looks polished, the summary stops being the signal.",
  },
  {
    title: "Work is inspectable now.",
    body: "Repos, design systems, shipped products, pull requests, docs, and case studies can all be parsed, searched, cited, and discussed.",
  },
  {
    title: "The interview should start from evidence.",
    body: "A better hiring process begins with the choices someone actually made: what they built, what broke, what they measured, and what trade-offs they can defend.",
  },
  {
    title: "Candidates should own the proof.",
    body: "A dossier should travel with the candidate and improve over time, instead of being trapped inside a single application funnel.",
  },
];

export default function ManifestoPage() {
  return (
    <MarketingShell>
      <main>
        <section className="border-b border-border bg-foreground text-background">
          <div className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
            <Badge className="border-background/20 bg-background/10 text-background" variant="outline">
              Manifesto
            </Badge>
            <h1 className="mt-6 text-5xl font-semibold leading-none tracking-normal md:text-7xl">
              Why the resume is dead and what replaces it.
            </h1>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-12 lg:px-8">
          <div className="divide-y divide-border border-y border-border">
            {sections.map((section, index) => (
              <article className="grid gap-6 py-8 md:grid-cols-[96px_1fr]" key={section.title}>
                <p className="font-mono text-sm text-primary">
                  {(index + 1).toString().padStart(2, "0")}
                </p>
                <div>
                  <h2 className="text-3xl font-semibold tracking-normal">{section.title}</h2>
                  <p className="mt-4 text-lg leading-8 text-muted-foreground">{section.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
