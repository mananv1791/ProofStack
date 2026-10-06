"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Braces,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Code2,
  Eye,
  FileCode2,
  FileSearch,
  Fingerprint,
  Layers3,
  LockKeyhole,
  MessageSquareText,
  Radar,
  Route,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const partnerLabels = [
  "Series A platform team",
  "Devtools recruiter",
  "Design systems lead",
  "Marketplace founder",
  "Applied AI hiring manager",
  "Seed-stage CTO",
];

const stackLayers = [
  {
    label: "01 candidate work",
    title: "Artifacts arrive as evidence, not attachments.",
    text: "Repos, Figma systems, shipped URLs, pull requests, and case studies are normalized into a candidate-owned proof graph.",
    icon: FileCode2,
  },
  {
    label: "02 retrieval layer",
    title: "Every question starts with retrieved context.",
    text: "The interview agent can point to files, commits, components, and product decisions before it asks for reasoning.",
    icon: Route,
  },
  {
    label: "03 interview engine",
    title: "Follow-ups adapt to depth, seniority, and signal gaps.",
    text: "No generic trivia. The system keeps pressing until it has enough evidence or marks the signal insufficient.",
    icon: Bot,
  },
  {
    label: "04 talent dossier",
    title: "Recruiters review a one-page proof packet.",
    text: "Scores, transcript highlights, concerns, strengths, and evidence links land in a compact hiring workflow.",
    icon: FileSearch,
  },
];

const rolePanels = [
  {
    value: "candidate",
    label: "Candidate",
    headline: "A portable dossier that makes the work visible.",
    body: "Upload one to three artifacts, complete one targeted interview, and decide who can see the resulting proof packet.",
    metrics: ["3 recruiter views", "86 proof score", "12 role matches"],
  },
  {
    value: "recruiter",
    label: "Recruiter",
    headline: "A shortlist that starts after the keyword filter ends.",
    body: "Post the role, describe what a great candidate would have built, and review matches ranked by artifact evidence.",
    metrics: ["24 matched dossiers", "4 shortlisted", "1 message accepted"],
  },
  {
    value: "manager",
    label: "Manager",
    headline: "Interview from the evidence instead of rediscovering basics.",
    body: "Walk into the onsite with grounded follow-up questions, score citations, and the candidate's actual decisions in view.",
    metrics: ["5 rubric dimensions", "6 transcript highlights", "0 resume warmups"],
  },
] as const;

const dossierRows = [
  ["System architecture", "91", "trade-offs cited"],
  ["Edge cases", "82", "failure paths named"],
  ["Execution craft", "88", "tests and boundaries"],
  ["Product sense", "86", "prioritized reliability"],
];

const proofEvents = [
  {
    time: "00:14",
    event: "Repo parsed",
    detail: "87 files, 12 architecture signals, 4 risk hotspots",
  },
  {
    time: "03:28",
    event: "Question anchored",
    detail: "sync-engine.ts -> reconnect conflict handling",
  },
  {
    time: "12:42",
    event: "Concern logged",
    detail: "observability answer needs production examples",
  },
  {
    time: "18:07",
    event: "Dossier generated",
    detail: "hire recommendation with evidence citations",
  },
];

const useCases = [
  {
    title: "Senior engineering",
    text: "Probe architecture, failure handling, code ownership, and system evolution from real repos.",
    bullets: ["RAG over code chunks", "artifact-owned citations", "seniority-aware follow-ups"],
  },
  {
    title: "Product design",
    text: "Read Figma structure, components, variants, decisions, and case-study reasoning.",
    bullets: ["design token extraction", "component depth", "case-study review"],
  },
  {
    title: "Founder hiring",
    text: "Replace brand-name heuristics with evidence that someone can ship and explain trade-offs.",
    bullets: ["portfolio signal", "proof score", "shortlist workflow"],
  },
];

function useGsapMarketingAnimations(rootRef: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      return;
    }

    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-hero-word]", {
          y: 28,
          duration: 0.7,
          stagger: 0.065,
        })
        .from(
          "[data-hero-copy]",
          { y: 16, duration: 0.65, stagger: 0.1 },
          "-=0.45",
        )
        .from(
          "[data-proof-card]",
          { y: 28, rotateX: 5, duration: 0.8, stagger: 0.08 },
          "-=0.5",
        );

      gsap.to("[data-float-card]", {
        y: -10,
        duration: 2.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.22,
      });

      gsap.to("[data-marquee]", {
        xPercent: -50,
        duration: 26,
        ease: "none",
        repeat: -1,
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 32,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 82%",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((element) => {
        gsap.from(element.children, {
          y: 24,
          duration: 0.72,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 84%",
          },
        });
      });

      gsap.from("[data-stack-line]", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-stack-line]",
          start: "top 80%",
        },
      });
    }, root);

    return () => context.revert();
  }, [rootRef]);
}

function SplitHeadline({ words }: { words: string[] }) {
  return (
    <span className="block">
      {words.map((word) => (
        <span className="mr-3 inline-block md:mr-4" key={word}>
          <span className="inline-block" data-hero-word>
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

function MiniScore({ label, score, detail }: { detail: string; label: string; score: string }) {
  return (
    <div className="border-b border-border px-4 py-3 last:border-b-0">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium">{label}</p>
          <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
        </div>
        <span className="font-mono text-lg font-semibold text-primary">{score}</span>
      </div>
    </div>
  );
}

function ProofConsole() {
  return (
    <div className="relative">
      <div
        className="absolute -left-5 top-14 hidden w-40 rounded-md border border-border bg-card p-3 shadow-sm lg:block"
        data-float-card
        data-proof-card
      >
        <div className="mb-2 flex items-center gap-2 text-xs font-medium">
          <Fingerprint className="size-3.5 text-accent" />
          Owner check
        </div>
        <div className="h-2 rounded-full bg-muted">
          <div className="h-2 w-[78%] rounded-full bg-accent" />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">verified commits</p>
      </div>

      <div
        className="absolute -right-6 bottom-16 hidden w-44 rounded-md border border-border bg-foreground p-3 text-background shadow-sm lg:block"
        data-float-card
        data-proof-card
      >
        <div className="flex items-center justify-between text-xs">
          <span>Match</span>
          <span className="font-mono">92</span>
        </div>
        <div className="mt-3 grid grid-cols-5 gap-1">
          {[80, 62, 92, 72, 88].map((height, index) => (
            <div className="flex h-16 items-end bg-background/10" key={index}>
              <div
                className="w-full bg-secondary"
                style={{ height: `${height}%` }}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className="clip-corner overflow-hidden border border-foreground bg-card shadow-[12px_12px_0_rgb(var(--foreground))]"
        data-proof-card
      >
        <div className="flex items-center justify-between border-b border-border bg-foreground px-4 py-3 text-background">
          <div className="flex items-center gap-2">
            <CircleDot className="size-4 text-secondary" />
            <span className="font-mono text-xs uppercase">Proof packet</span>
          </div>
          <Badge className="border-background/20 bg-background/10 text-background" variant="outline">
            live demo
          </Badge>
        </div>

        <div className="grid lg:grid-cols-[180px_1fr]">
          <div className="border-b border-border bg-muted/50 p-4 font-mono text-xs lg:border-b-0 lg:border-r">
            <p className="text-muted-foreground">repo://collab-editor</p>
            <p className="mt-3 text-foreground">app/editor.tsx</p>
            <p className="text-muted-foreground">lib/sync-engine.ts</p>
            <p className="text-muted-foreground">supabase/rls.sql</p>
            <div className="mt-5 rounded-md border border-border bg-card p-3">
              <p className="text-muted-foreground">artifact status</p>
              <p className="mt-1 text-accent">ready</p>
            </div>
          </div>

          <div className="space-y-4 p-4">
            <div className="rounded-md border border-border bg-background p-4">
              <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase text-muted-foreground">
                <Bot className="size-4 text-primary" />
                Interview question
              </div>
              <p className="text-sm leading-6">
                Your sync engine replays optimistic operations after reconnect.
                What happens if op 3 is accepted but op 2 is rejected?
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-md border border-border bg-background">
                {dossierRows.map(([label, score, detail]) => (
                  <MiniScore detail={detail} key={label} label={label} score={score} />
                ))}
              </div>

              <div className="rounded-md border border-border bg-foreground p-4 text-background">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase text-background/70">
                    dossier.json
                  </span>
                  <Braces className="size-4 text-secondary" />
                </div>
                <pre className="mt-4 overflow-hidden font-mono text-xs leading-5 text-background/80">
                  {`{
  "recommendation": "hire",
  "overall_score": 86,
  "citations": 14,
  "concerns": 2
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProofStackHome() {
  const rootRef = useRef<HTMLDivElement>(null);
  useGsapMarketingAnimations(rootRef);

  return (
    <div ref={rootRef}>
      <section className="proof-paper overflow-hidden border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(440px,1fr)] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <div data-hero-copy>
              <Badge className="w-fit border-foreground/20 bg-card/80" variant="outline">
                Proof-of-work hiring infrastructure
              </Badge>
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-normal md:text-7xl">
              <SplitHeadline words={["Turn", "work"]} />
              <SplitHeadline words={["into", "the"]} />
              <SplitHeadline words={["interview."]} />
            </h1>
            <p
              className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground"
              data-hero-copy
            >
              ProofStack reads real artifacts, generates adaptive interviews
              grounded in that work, and packages the evidence into dossiers
              recruiters and hiring managers can inspect.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-hero-copy>
              <Button asChild size="lg">
                <Link href="/demo">
                  Explore the dossier
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild className="bg-card/80" size="lg" variant="outline">
                <Link href="/auth/sign-up">Join beta</Link>
              </Button>
            </div>

            <div
              className="mt-10 grid max-w-2xl grid-cols-3 divide-x divide-border border-y border-border bg-card/70"
              data-hero-copy
            >
              {[
                ["100", "target dossiers"],
                ["10", "design partners"],
                ["3", "case study hires"],
              ].map(([value, label]) => (
                <div className="p-4" key={label}>
                  <p className="font-mono text-2xl font-semibold text-primary">{value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <ProofConsole />
        </div>

        <div className="border-y border-border bg-foreground py-3 text-background">
          <div className="flex w-max gap-3 whitespace-nowrap font-mono text-xs uppercase" data-marquee>
            {[...partnerLabels, ...partnerLabels].map((label, index) => (
              <span
                className="mx-2 inline-flex items-center gap-2 rounded-full border border-background/20 px-3 py-1"
                key={`${label}-${index}`}
              >
                <Sparkles className="size-3 text-secondary" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr]">
            <div data-reveal>
              <Badge variant="outline">Built like infrastructure</Badge>
              <h2 className="mt-4 text-4xl font-semibold tracking-normal md:text-5xl">
                Evidence infrastructure designed to evolve.
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Inspired by infrastructure sites that make abstract systems feel
                concrete, ProofStack exposes the hiring pipeline as a visible
                stack: artifact, retrieval, interview, dossier.
              </p>
            </div>

            <div className="relative" data-stagger>
              <div className="absolute left-4 top-8 hidden h-[calc(100%-64px)] w-px bg-border md:block" />
              <div
                className="absolute left-4 top-8 hidden h-[calc(100%-64px)] w-px bg-primary md:block"
                data-stack-line
              />
              {stackLayers.map((layer) => {
                const Icon = layer.icon;

                return (
                  <article className="relative mb-4 rounded-md border border-border bg-background p-5 md:ml-10" key={layer.label}>
                    <div className="absolute -left-[54px] top-5 hidden size-8 place-items-center rounded-full border border-border bg-card text-primary md:grid">
                      <Icon className="size-4" />
                    </div>
                    <p className="font-mono text-xs uppercase text-primary">{layer.label}</p>
                    <h3 className="mt-2 text-xl font-semibold tracking-normal">{layer.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{layer.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-b border-border bg-background">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 lg:grid-cols-[0.72fr_1fr] lg:px-8">
          <div data-reveal>
            <p className="font-mono text-xs uppercase text-primary">Designed to help you hire</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-normal md:text-5xl">
              Three workflows, one proof layer.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3" data-stagger>
            {rolePanels.map((panel, index) => (
                <Card
                  className={cn(
                    "border-border shadow-none",
                    index === 1 && "bg-foreground text-background",
                  )}
                  key={panel.value}
                >
                  <CardHeader>
                    <Badge
                      className={cn(
                        "w-fit",
                        index === 1 && "border-background/20 bg-background/10 text-background",
                      )}
                      variant="outline"
                    >
                      {panel.label}
                    </Badge>
                    <CardTitle className="text-2xl">{panel.headline}</CardTitle>
                    <CardDescription
                      className={cn(
                        "text-base leading-7",
                        index === 1 && "text-background/65",
                      )}
                    >
                      {panel.body}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-3">
                    {panel.metrics.map((metric) => (
                      <div
                        className={cn(
                          "rounded-md border border-border bg-muted/40 p-3",
                          index === 1 && "border-background/15 bg-background/10",
                        )}
                        key={metric}
                      >
                        <p className={cn("font-mono text-sm text-primary", index === 1 && "text-secondary")}>
                          {metric}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 lg:grid-cols-[0.9fr_1fr] lg:px-8">
          <div data-reveal>
            <Badge className="border-background/20 bg-background/10 text-background" variant="outline">
              Product console
            </Badge>
            <h2 className="mt-4 text-4xl font-semibold tracking-normal md:text-5xl">
              Watch the proof packet assemble itself.
            </h2>
            <p className="mt-4 text-base leading-7 text-background/70">
              Recruiters do not need another resume database. They need a live
              operating view of the evidence that matters, where every score can
              point back to work or transcript.
            </p>
          </div>

          <div className="grid gap-3" data-stagger>
            {proofEvents.map((item) => (
              <div
                className="grid gap-4 rounded-md border border-background/15 bg-background/10 p-4 md:grid-cols-[72px_1fr_auto]"
                key={item.time}
              >
                <span className="font-mono text-sm text-secondary">{item.time}</span>
                <div>
                  <p className="font-medium">{item.event}</p>
                  <p className="mt-1 text-sm text-background/65">{item.detail}</p>
                </div>
                <CheckCircle2 className="size-5 text-accent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="proof-grid border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <div className="max-w-3xl" data-reveal>
            <p className="font-mono text-xs uppercase text-primary">Versatile by design</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-normal md:text-5xl">
              Proof works across more than one role archetype.
            </h2>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3" data-stagger>
            {useCases.map((useCase, index) => (
              <Card className={cn("border-border shadow-none", index === 1 && "bg-foreground text-background")} key={useCase.title}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {index === 0 ? <Code2 className="size-5 text-primary" /> : null}
                    {index === 1 ? <Layers3 className="size-5 text-secondary" /> : null}
                    {index === 2 ? <Building2 className="size-5 text-primary" /> : null}
                    {useCase.title}
                  </CardTitle>
                  <CardDescription className={index === 1 ? "text-background/65" : undefined}>
                    {useCase.text}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {useCase.bullets.map((bullet) => (
                    <div className="flex items-center gap-2 text-sm" key={bullet}>
                      <ChevronRight className={cn("size-4", index === 1 ? "text-secondary" : "text-primary")} />
                      {bullet}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 lg:grid-cols-[0.95fr_1fr] lg:px-8">
          <div data-reveal>
            <p className="font-mono text-xs uppercase text-primary">Signal with safeguards</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-normal md:text-5xl">
              Scores are only allowed when the model can cite evidence.
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2" data-stagger>
            {[
              { icon: Eye, title: "Artifact citations", text: "Every insight links back to work the candidate submitted." },
              { icon: MessageSquareText, title: "Transcript highlights", text: "Strong and weak reasoning moments are tagged for review." },
              { icon: ShieldCheck, title: "Two-model audit", text: "A second pass flags unsupported scoring before dossiers ship." },
              { icon: LockKeyhole, title: "Visibility control", text: "Candidates decide whether dossiers are private, shared, or recruiter-only." },
              { icon: Radar, title: "Calibrated rubric", text: "Architecture, edge cases, execution, communication, and product sense stay separate." },
              { icon: Users, title: "Recruiter health", text: "Response rate and ghosting controls protect the candidate marketplace." },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div className="rounded-md border border-border bg-card p-5" key={item.title}>
                  <Icon className="size-5 text-primary" />
                  <h3 className="mt-4 font-semibold tracking-normal">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 lg:grid-cols-[1fr_auto] lg:items-end lg:px-8">
          <div data-reveal>
            <p className="font-mono text-xs uppercase text-secondary">Launch wedge</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal md:text-6xl">
              Build the shortlist your hiring manager actually wants to read.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col" data-reveal>
            <Button asChild className="bg-background text-foreground hover:bg-background/80" size="lg">
              <Link href="/auth/sign-up">
                Join beta
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              className="border-background/25 bg-transparent text-background hover:bg-background/10"
              size="lg"
              variant="outline"
            >
              <Link href="/for-recruiters">See recruiter flow</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
