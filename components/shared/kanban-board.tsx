import { Badge } from "@/components/ui/badge";

type KanbanColumn = {
  title: string;
  items: {
    candidate: string;
    meta: string;
    score: number;
  }[];
};

export function KanbanBoard({ columns }: { columns: KanbanColumn[] }) {
  return (
    <div className="grid gap-3 lg:grid-cols-5">
      {columns.map((column) => (
        <section className="rounded-md border border-border bg-card" key={column.title}>
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <h3 className="text-sm font-medium">{column.title}</h3>
            <Badge variant="outline">{column.items.length}</Badge>
          </div>
          <div className="space-y-2 p-2">
            {column.items.map((item) => (
              <article
                className="rounded-md border border-border bg-background p-3"
                key={`${column.title}-${item.candidate}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{item.candidate}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.meta}</p>
                  </div>
                  <span className="font-mono text-sm font-semibold text-primary">
                    {item.score}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
