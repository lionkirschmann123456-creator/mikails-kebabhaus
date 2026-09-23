import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layout } from "@/components/layout";
import { MenuCard } from "@/components/menu-card";
import { CATEGORIES, MENU, type CategoryId } from "@/lib/menu";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/menu")({ component: MenuPage });

function MenuPage() {
  const [active, setActive] = useState<CategoryId | "all">("all");
  const items = useMemo(
    () => (active === "all" ? MENU : MENU.filter((m) => m.category === active)),
    [active],
  );

  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
          Speisekarte
        </p>
        <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">
          Vom Grill auf den Tisch
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          Alles frisch, alles nach Wunsch. Döner und Dürüm kannst du in der nächsten
          Ansicht zusammenstellen.
        </p>

        <div className="sticky top-16 z-20 -mx-4 mt-8 overflow-x-auto bg-bg/90 px-4 py-3 backdrop-blur-sm">
          <div className="flex gap-2">
            <FilterChip
              label="Alles"
              on={active === "all"}
              onClick={() => setActive("all")}
            />
            {CATEGORIES.map((c) => (
              <FilterChip
                key={c.id}
                label={c.label}
                on={active === c.id}
                onClick={() => setActive(c.id)}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

function FilterChip({
  label,
  on,
  onClick,
}: {
  label: string;
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-11 shrink-0 rounded-full px-4 text-sm font-medium transition-colors duration-[var(--motion-quick)]",
        on ? "bg-primary text-primary-fg" : "bg-surface-2 text-fg",
      )}
    >
      {label}
    </button>
  );
}
