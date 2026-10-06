import { cn } from "@/lib/utils";

type ScoreGaugeProps = {
  className?: string;
  label?: string;
  score: number;
};

export function ScoreGauge({ className, label = "Overall proof score", score }: ScoreGaugeProps) {
  const boundedScore = Math.min(100, Math.max(0, score));

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div
        aria-label={`${label}: ${boundedScore} out of 100`}
        className="grid size-28 place-items-center rounded-full"
        role="img"
        style={{
          background: `conic-gradient(rgb(var(--primary)) ${boundedScore * 3.6}deg, rgb(var(--muted)) 0deg)`,
        }}
      >
        <div className="grid size-20 place-items-center rounded-full bg-card">
          <span className="font-mono text-2xl font-semibold">{boundedScore}</span>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="mt-1 max-w-xs text-sm text-muted-foreground">
          Evidence weighted across architecture, edge cases, execution,
          communication, and product sense.
        </p>
      </div>
    </div>
  );
}
