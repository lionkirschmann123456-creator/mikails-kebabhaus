import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  EXTRAS,
  getItem,
  MEATS,
  SALADS,
  SAUCES,
  SIZES,
} from "@/lib/menu";
import { useCart } from "@/lib/store";
import { cn, euro } from "@/lib/utils";

export const Route = createFileRoute("/item/$id")({ component: ItemPage });

function ItemPage() {
  const { id } = Route.useParams();
  const item = getItem(id);
  const navigate = useNavigate();
  const addLine = useCart((s) => s.addLine);

  const [size, setSize] = useState<(typeof SIZES)[number]["id"]>("normal");
  const [meat, setMeat] = useState<(typeof MEATS)[number]["id"]>(
    item?.id.includes("huhn") ? "huhn" : item?.id.includes("falafel") ? "falafel" : "kalb",
  );
  const [sauces, setSauces] = useState<string[]>(["knoblauch"]);
  const [salad, setSalad] = useState<string[]>(SALADS.map((s) => s.id));
  const [extras, setExtras] = useState<string[]>(
    item?.id === "super-doener" ? ["fleisch"] : [],
  );
  const [note, setNote] = useState("");
  const [qty, setQty] = useState(1);

  const unitPrice = useMemo(() => {
    if (!item) return 0;
    const sizeExtra = SIZES.find((s) => s.id === size)?.extra ?? 0;
    const meatExtra = MEATS.find((m) => m.id === meat)?.extra ?? 0;
    const extrasSum = extras.reduce(
      (n, id) => n + (EXTRAS.find((e) => e.id === id)?.extra ?? 0),
      0,
    );
    return item.price + sizeExtra + meatExtra + extrasSum;
  }, [item, size, meat, extras]);

  if (!item) {
    return (
      <Layout>
        <div className="mx-auto max-w-lg px-4 py-24 text-center">
          <h1 className="font-display text-2xl">Gericht nicht gefunden</h1>
          <Button asChild className="mt-6">
            <Link to="/menu">Zur Speisekarte</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  function toggle(list: string[], id: string, setter: (v: string[]) => void) {
    setter(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  }

  function add() {
    if (!item) return;
    const sizeLabel = SIZES.find((s) => s.id === size)?.label;
    const meatLabel = MEATS.find((m) => m.id === meat)?.label;
    const sauceLabels = SAUCES.filter((s) => sauces.includes(s.id)).map((s) => s.label);
    const saladLabels = SALADS.filter((s) => salad.includes(s.id)).map((s) => s.label);
    const extraLabels = EXTRAS.filter((e) => extras.includes(e.id)).map((e) => e.label);
    const options = [
      sizeLabel,
      meatLabel,
      sauceLabels.length ? `Soße: ${sauceLabels.join(", ")}` : "Ohne Soße",
      saladLabels.length ? saladLabels.join(", ") : "Ohne Salat",
      ...extraLabels,
      note.trim() ? `Hinweis: ${note.trim()}` : "",
    ].filter(Boolean) as string[];

    addLine({
      itemId: item.id,
      name: item.name,
      qty,
      unitPrice,
      options,
      image: item.image,
    });
    toast.success(`${item.name} liegt im Korb`);
    void navigate({ to: "/menu" });
  }

  return (
    <Layout>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-2 lg:py-12">
        <div>
          <Link
            to="/menu"
            className="mb-4 inline-flex h-11 items-center gap-2 text-sm text-muted hover:text-fg"
          >
            <ArrowLeft className="size-4" />
            Speisekarte
          </Link>
          <div className="overflow-hidden rounded-xl bg-surface-2">
            <img
              src={item.image}
              alt={item.name}
              className="aspect-photo w-full object-cover"
            />
          </div>
        </div>

        <div>
          <h1 className="font-display text-4xl font-medium tracking-tight">{item.name}</h1>
          <p className="mt-2 text-muted">{item.description}</p>
          <p className="mt-4 font-display text-2xl tabular-nums">{euro(unitPrice)}</p>

          <fieldset className="mt-8">
            <legend className="text-sm font-medium">Größe</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <Chip
                  key={s.id}
                  label={s.extra ? `${s.label} (+${euro(s.extra)})` : s.label}
                  on={size === s.id}
                  onClick={() => setSize(s.id)}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="text-sm font-medium">Fleisch</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {MEATS.map((m) => (
                <Chip
                  key={m.id}
                  label={m.extra ? `${m.label} (+${euro(m.extra)})` : m.label}
                  on={meat === m.id}
                  onClick={() => setMeat(m.id)}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="text-sm font-medium">Soße</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {SAUCES.map((s) => (
                <Chip
                  key={s.id}
                  label={s.label}
                  on={sauces.includes(s.id)}
                  onClick={() => toggle(sauces, s.id, setSauces)}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="text-sm font-medium">Salat</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {SALADS.map((s) => (
                <Chip
                  key={s.id}
                  label={s.label}
                  on={salad.includes(s.id)}
                  onClick={() => toggle(salad, s.id, setSalad)}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="text-sm font-medium">Extras</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {EXTRAS.map((e) => (
                <Chip
                  key={e.id}
                  label={`${e.label} (+${euro(e.extra)})`}
                  on={extras.includes(e.id)}
                  onClick={() => toggle(extras, e.id, setExtras)}
                />
              ))}
            </div>
          </fieldset>

          <div className="mt-6 space-y-2">
            <Label htmlFor="note">Hinweis an die Küche</Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="z. B. wenig Zwiebel, extra scharf…"
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 rounded-md bg-surface-2 p-1">
              <button
                type="button"
                className="flex size-11 items-center justify-center"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Weniger"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center tabular-nums">{qty}</span>
              <button
                type="button"
                className="flex size-11 items-center justify-center"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Mehr"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <Button size="lg" className="min-w-48 flex-1" onClick={add}>
              {euro(unitPrice * qty)} · in den Korb
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function Chip({
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
      aria-pressed={on}
      onClick={onClick}
      className={cn(
        "h-11 rounded-full px-4 text-sm font-medium transition-colors duration-[var(--motion-quick)]",
        on ? "bg-primary text-primary-fg" : "bg-surface-2 text-fg",
      )}
    >
      {label}
    </button>
  );
}
