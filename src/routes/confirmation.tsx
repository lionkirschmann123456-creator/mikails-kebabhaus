import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Clock, MapPin } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { HOUSE } from "@/lib/menu";
import { useCart } from "@/lib/store";
import { euro } from "@/lib/utils";

export const Route = createFileRoute("/confirmation")({ component: ConfirmationPage });

function ConfirmationPage() {
  const order = useCart((s) => s.lastOrder);

  if (!order) {
    return (
      <Layout>
        <div className="mx-auto max-w-lg px-4 py-24 text-center">
          <h1 className="font-display text-2xl">Keine Bestellung</h1>
          <Button asChild className="mt-6">
            <Link to="/menu">Zur Speisekarte</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const pickup = order.fulfillment === "abholen";

  return (
    <Layout>
      <div className="mx-auto max-w-lg px-4 py-16">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-fg">
          <Check className="size-6" strokeWidth={2} />
        </div>
        <p className="mt-6 text-xs font-medium tracking-[0.18em] text-muted uppercase">
          Bestellung {order.id}
        </p>
        <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">
          {pickup ? "Wird vorbereitet." : "Unterwegs, bald."}
        </h1>
        <p className="mt-3 text-muted">
          Danke, {order.customer.name.split(" ")[0]}. Die Küche hat deine Bestellung.
        </p>

        <div className="mt-8 space-y-3 rounded-xl bg-surface p-6 shadow-border">
          <p className="inline-flex items-center gap-2 text-sm">
            <Clock className="size-4 text-primary" />
            Ca. {order.etaMin} Minuten
          </p>
          <p className="inline-flex items-start gap-2 text-sm">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
            {pickup
              ? `${HOUSE.street}, ${HOUSE.city}`
              : order.customer.address}
          </p>
          <p className="text-sm text-muted">
            {pickup
              ? `Einfach an der Theke deinen Namen sagen. ${HOUSE.phone}`
              : `Der Fahrer ruft an unter ${order.customer.phone}.`}
          </p>
        </div>

        <ul className="mt-6 space-y-2 text-sm">
          {order.lines.map((line) => (
            <li key={line.lineId} className="flex justify-between gap-3">
              <span>
                <span className="tabular-nums text-muted">{line.qty}×</span> {line.name}
              </span>
              <span className="tabular-nums">{euro(line.unitPrice * line.qty)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex justify-between border-t border-border pt-4 font-medium">
          <span>Summe</span>
          <span className="tabular-nums">{euro(order.total)}</span>
        </p>
        <p className="mt-2 text-xs text-muted">
          Zahlung {pickup ? "an der Theke" : "beim Fahrer"} — bar oder Karte.
        </p>

        <Button asChild className="mt-8 w-full" size="lg" variant="outline">
          <Link to="/">Zurück zum Haus</Link>
        </Button>
      </div>
    </Layout>
  );
}
