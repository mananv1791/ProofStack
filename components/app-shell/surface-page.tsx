import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Metric = {
  label: string;
  value: string;
  delta?: string;
};

type SurfacePageProps = {
  actions?: ReactNode;
  children?: ReactNode;
  description: string;
  eyebrow: string;
  metrics?: Metric[];
  title: string;
};

export function SurfacePage({
  actions,
  children,
  description,
  eyebrow,
  metrics = [],
  title,
}: SurfacePageProps) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase text-primary">{eyebrow}</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-normal md:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">
            {description}
          </p>
        </div>
        {actions ? <div className="flex gap-2">{actions}</div> : null}
      </div>

      {metrics.length ? (
        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-4">
          {metrics.map((metric) => (
            <Card className="border-border shadow-none" key={metric.label}>
              <CardHeader className="pb-2">
                <CardDescription>{metric.label}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between gap-3">
                  <p className="text-2xl font-semibold tracking-normal">{metric.value}</p>
                  {metric.delta ? (
                    <Badge className="gap-1" variant="secondary">
                      {metric.delta}
                      <ArrowUpRight className="size-3" />
                    </Badge>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}

      {children}
    </div>
  );
}

type StatusListProps = {
  items: {
    label: string;
    meta: string;
    status: string;
  }[];
  title: string;
  description?: string;
};

export function StatusList({ description, items, title }: StatusListProps) {
  return (
    <Card className="border-border shadow-none">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="divide-y divide-border">
        {items.map((item) => (
          <div className="flex items-center justify-between gap-4 py-3" key={item.label}>
            <div>
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.meta}</p>
            </div>
            <Badge variant="outline">{item.status}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
