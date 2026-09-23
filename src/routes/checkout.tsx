import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HOUSE } from "@/lib/menu";
import {
  cartSubtotal,
  deliveryFeeFor,
  type Fulfillment,
  useCart,
} from "@/lib/store";
import { cn, euro, uid } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({ component: CheckoutPage });

function CheckoutPage() {
  const lines = useCart((s) => s.lines);
  const placeOrder = useCart((s) => s.placeOrder);
  const navigate = useNavigate();
  const [fulfillment, setFulfillment] = useState<Fulfillment>("abholen");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const subtotal = cartSubtotal(lines);
  const deliveryFee = deliveryFeeFor(subtotal, fulfillment);
  const total = subtotal + deliveryFee;

  if (lines.length === 0) {
    return (
      <Layout>
        <div className="mx-auto max-w-lg px-4 py-24 text-center">
          <h1 className="font-display text-2xl">Warenkorb ist leer</h1>
          <p className="mt-2 text-muted">Leg erst etwas auf den Spieß.</p>
          <Button asChild className="mt-6">
            <Link to="/menu">Zur Speisekarte</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !phone.trim()) {
      setError("Name und Telefon brauchen wir für die Bestellung.");
      return;
    }
    if (fulfillment === "lieferung") {
      if (!address.trim()) {
        setError("Für die Lieferung brauchen wir eine Adresse.");
        return;
      }
      if (subtotal < HOUSE.minDelivery) {
        setError(`Mindestbestellwert für Lieferung: ${euro(HOUSE.minDelivery)}.`);
        return;
      }
    }
    const etaMin = fulfillment === "abholen" ? 18 : 40;
    placeOrder({
      id: `MK-${uid().slice(0, 4).toUpperCase()}`,
      createdAt: Date.now(),
      fulfillment,
      customer: {
        name: name.trim(),
        phone: phone.trim(),
        address: fulfillment === "lieferung" ? address.trim() : undefined,
      },
      notes: notes.trim(),
      lines,
      subtotal,
      deliveryFee,
      total,
      etaMin,
    });
    void navigate({ to: "/confirmation" });
  }

  return (
    <Layout>
      <form onSubmit={submit} className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h1 className="font-display text-4xl font-medium tracking-tight">Kasse</h1>
          <p className="mt-2 text-muted">Abholen an der Theke oder Lieferung im Kiez.</p>

          <div className="mt-8 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setFulfillment("abholen")}
              className={cn(
                "h-14 rounded-lg text-sm font-medium",
                fulfillment === "abholen"
                  ? "bg-primary text-primary-fg"
                  : "bg-surface-2 text-fg",
              )}
            >
              Abholen
            </button>
            <button
              type="button"
              onClick={() => setFulfillment("lieferung")}
              className={cn(
                "h-14 rounded-lg text-sm font-medium",
                fulfillment === "lieferung"
                  ? "bg-primary text-primary-fg"
                  : "bg-surface-2 text-fg",
              )}
            >
              Lieferung
            </button>
          </div>

          <div className="mt-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            {fulfillment === "lieferung" && (
              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  autoComplete="street-address"
                  placeholder="Straße, Hausnummer, PLZ Berlin"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <p className="text-xs text-muted">
                  Lieferung ab {euro(HOUSE.minDelivery)}, frei ab {euro(HOUSE.freeDeliveryFrom)}.
                  Liefergebühr {euro(HOUSE.deliveryFee)}.
                </p>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="notes">Hinweis</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Klingel, Allergien, extra scharf…"
              />
            </div>
          </div>
          {error && <p className="mt-4 text-sm text-primary">{error}</p>}
        </div>

        <aside className="h-fit rounded-xl bg-surface p-6 shadow-border lg:col-span-2">
          <h2 className="font-display text-xl font-medium">Deine Bestellung</h2>
          <ul className="mt-4 space-y-3">
            {lines.map((line) => (
              <li key={line.lineId} className="flex justify-between gap-3 text-sm">
                <span>
                  <span className="tabular-nums text-muted">{line.qty}×</span> {line.name}
                </span>
                <span className="tabular-nums">{euro(line.unitPrice * line.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Zwischensumme</dt>
              <dd className="tabular-nums">{euro(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Lieferung</dt>
              <dd className="tabular-nums">
                {fulfillment === "abholen" ? "Abholung" : euro(deliveryFee)}
              </dd>
            </div>
            <div className="flex justify-between font-medium">
              <dt>Summe</dt>
              <dd className="tabular-nums">{euro(total)}</dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-muted">
            Zahlung bar oder Karte {fulfillment === "abholen" ? "an der Theke" : "beim Fahrer"}.
          </p>
          <Button type="submit" size="lg" className="mt-6 w-full">
            Bestellung absenden
          </Button>
        </aside>
      </form>
    </Layout>
  );
}
