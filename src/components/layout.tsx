import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useState, type ReactNode } from "react";
import { CartSheet } from "@/components/cart-sheet";
import { Logo } from "@/components/logo";
import { HOUSE } from "@/lib/menu";
import { cartCount, cartSubtotal, useCart } from "@/lib/store";
import { euro } from "@/lib/utils";

export function Layout({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const lines = useCart((s) => s.lines);
  const count = cartCount(lines);
  const subtotal = cartSubtotal(lines);

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-fg">
      <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link to="/menu" className="text-muted transition-colors hover:text-fg">
              Speisekarte
            </Link>
            <Link to="/info" className="text-muted transition-colors hover:text-fg">
              Lage & Zeiten
            </Link>
          </nav>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative flex h-11 items-center gap-2 rounded-md bg-surface-2 px-3 text-sm font-medium"
            aria-label="Warenkorb öffnen"
          >
            <ShoppingBag className="size-4" />
            <span className="hidden sm:inline">Korb</span>
            {count > 0 && (
              <span className="flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs tabular-nums text-primary-fg">
                {count}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="flex-1 pb-24 md:pb-0">{children}</main>

      <footer className="mt-auto border-t border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-sm text-muted">
              Feuer, Fladenbrot, Familie. Kreuzberg, seit 2014.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Adresse</p>
            <p className="mt-2 text-sm text-muted">
              {HOUSE.street}
              <br />
              {HOUSE.city}
              <br />
              {HOUSE.phone}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Öffnungszeiten</p>
            <ul className="mt-2 space-y-1 text-sm text-muted">
              {HOUSE.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-4">
                  <span>{h.days}</span>
                  <span className="tabular-nums">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="border-t border-border px-4 py-4 text-center text-xs text-subtle">
          {HOUSE.name} · Kein Lieferdienst-Konto nötig · Bestellung bleibt auf diesem Gerät
        </p>
      </footer>

      {count > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface p-3 md:hidden">
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="flex h-12 w-full items-center justify-between rounded-lg bg-primary px-4 text-sm font-medium text-primary-fg"
          >
            <span>Warenkorb · {count}</span>
            <span className="tabular-nums">{euro(subtotal)}</span>
          </button>
        </div>
      )}

      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
}
