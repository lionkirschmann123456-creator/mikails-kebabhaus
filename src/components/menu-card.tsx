import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import type { MenuItem } from "@/lib/menu";
import { useCart } from "@/lib/store";
import { euro } from "@/lib/utils";

export function MenuCard({ item }: { item: MenuItem }) {
  const addLine = useCart((s) => s.addLine);

  function addPlain() {
    addLine({
      itemId: item.id,
      name: item.name,
      qty: 1,
      unitPrice: item.price,
      options: [],
      image: item.image,
    });
    toast.success(`${item.name} liegt im Korb`);
  }

  const inner = (
    <>
      <div className="relative aspect-photo overflow-hidden rounded-lg bg-surface-2">
        <img
          src={item.image}
          alt={item.name}
          className="size-full object-cover transition-transform duration-[var(--motion-slow)] ease-[var(--ease-smooth-out)] group-hover:scale-105"
        />
        {item.badge && (
          <Badge className="absolute top-3 left-3">{item.badge}</Badge>
        )}
      </div>
      <div className="flex items-start justify-between gap-3 pt-3">
        <div className="min-w-0">
          <h3 className="font-display text-lg font-medium tracking-tight">{item.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted">{item.description}</p>
        </div>
        <p className="shrink-0 tabular-nums text-sm font-medium">{euro(item.price)}</p>
      </div>
    </>
  );

  if (item.customizable) {
    return (
      <Link
        to="/item/$id"
        params={{ id: item.id }}
        className="group block rounded-xl bg-surface p-2 text-fg no-underline shadow-border"
      >
        {inner}
        <p className="mt-3 px-1 pb-1 text-xs font-medium text-primary">Anpassen</p>
      </Link>
    );
  }

  return (
    <article className="group rounded-xl bg-surface p-2 shadow-border">
      {inner}
      <button
        type="button"
        onClick={addPlain}
        className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-surface-2 text-sm font-medium hover:bg-primary hover:text-primary-fg"
      >
        <Plus className="size-4" />
        Hinzufügen
      </button>
    </article>
  );
}
