import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { HOUSE } from "@/lib/menu";

export const Route = createFileRoute("/info")({ component: InfoPage });

function InfoPage() {
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${HOUSE.street} ${HOUSE.city}`,
  )}`;

  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
          Das Haus
        </p>
        <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">
          Lage & Zeiten
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          Kreuzberg, Ecke wo der Spieß nie kalt wird. Komm vorbei — oder lass dir
          den Döner bringen.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-xl bg-surface shadow-border">
            <img
              src="/food/interior.jpg"
              alt="Innenraum Mikail's Kebabhaus"
              className="h-56 w-full object-cover"
            />
            <div className="space-y-4 p-6">
              <p className="flex items-start gap-3 text-sm">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>
                  {HOUSE.street}
                  <br />
                  {HOUSE.city}
                </span>
              </p>
              <p className="flex items-center gap-3 text-sm">
                <Phone className="size-4 text-primary" />
                <a href={`tel:${HOUSE.phone.replace(/\s/g, "")}`} className="hover:underline">
                  {HOUSE.phone}
                </a>
              </p>
              <Button asChild variant="outline" className="w-full">
                <a href={maps} target="_blank" rel="noreferrer">
                  Karte öffnen
                </a>
              </Button>
            </div>
          </div>

          <div className="rounded-xl bg-surface p-6 shadow-border">
            <p className="flex items-center gap-2 font-medium">
              <Clock className="size-4 text-primary" />
              Öffnungszeiten
            </p>
            <ul className="mt-6 space-y-3">
              {HOUSE.hours.map((h) => (
                <li
                  key={h.days}
                  className="flex items-baseline justify-between gap-4 border-b border-border pb-3 text-sm last:border-0"
                >
                  <span>{h.days}</span>
                  <span className="tabular-nums text-muted">{h.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              Küche bis 20 Minuten vor Schluss. Freitag- und Samstagnacht: der Spieß
              läuft bis 1 Uhr.
            </p>
            <Button asChild className="mt-8 w-full" size="lg">
              <Link to="/menu">Jetzt bestellen</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
