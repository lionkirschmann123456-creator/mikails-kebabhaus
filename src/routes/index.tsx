import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { Layout } from "@/components/layout";
import { MenuCard } from "@/components/menu-card";
import { Button } from "@/components/ui/button";
import { FEATURED_IDS, HOUSE, MENU } from "@/lib/menu";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const featured = FEATURED_IDS.map((id) => MENU.find((m) => m.id === id)!);

  return (
    <Layout>
      <section className="relative min-h-[78vh] overflow-hidden">
        <img
          src="/hero.jpg"
          alt="Dönerspieß bei Mikail's Kebabhaus"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-bg/70" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-4 py-16">
          <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
            Berlin · Seit 2014
          </p>
          <h1 className="mt-3 max-w-xl font-display text-5xl font-medium tracking-tight text-fg italic sm:text-6xl">
            Mikail's Kebabhaus
          </h1>
          <p className="mt-4 max-w-md text-base text-muted">
            Feuer, Fladenbrot, Familie. Döner, Dürüm und Teller — frisch vom Spieß,
            so wie am Abend der ersten Schicht.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/menu">
                Speisekarte
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/info">Lage & Zeiten</Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-2">
              <Clock className="size-4" />
              {HOUSE.hoursShort}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4" />
              {HOUSE.street}, {HOUSE.city}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
              Vom Spieß
            </p>
            <h2 className="mt-1 font-display text-3xl font-medium tracking-tight">
              Die Klassiker
            </h2>
          </div>
          <Button asChild variant="ghost">
            <Link to="/menu">
              Alles zeigen
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl md:grid-cols-2">
          <img
            src="/food/interior.jpg"
            alt="Theke im Kebabhaus"
            className="h-72 w-full object-cover md:h-full"
          />
          <div className="flex flex-col justify-center px-6 py-12 md:px-12">
            <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
              Das Haus
            </p>
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight">
              Ein Spieß, eine Adresse, jede Nacht.
            </h2>
            <p className="mt-4 text-muted">
              Mikail steht seit über zehn Jahren hinter der Theke in der
              Oranienstraße. Kalb vom Metzger um die Ecke, Brot aus der Steinofen-Bäckerei,
              Soßen nach Hausrezept. Kein Franchise — ein Laden.
            </p>
            <Button asChild className="mt-6 w-fit" variant="outline">
              <Link to="/info">Vorbeikommen</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-3xl font-medium tracking-tight">So bestellst du</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Wählen",
              d: "Döner, Dürüm, Teller. Soße, Salat, extras — alles anpassen.",
            },
            {
              n: "02",
              t: "Abholen oder liefern",
              d: "In 15 Minuten an der Theke. Lieferung ab 12 Euro im Kiez.",
            },
            {
              n: "03",
              t: "Essen",
              d: "Warm, saftig, ohne App-Theater. Nur der Spieß zählt.",
            },
          ].map((step) => (
            <li key={step.n} className="rounded-xl bg-surface p-6 shadow-border">
              <p className="font-display text-sm text-primary">{step.n}</p>
              <h3 className="mt-2 font-display text-xl font-medium">{step.t}</h3>
              <p className="mt-2 text-sm text-muted">{step.d}</p>
            </li>
          ))}
        </ol>
      </section>
    </Layout>
  );
}
