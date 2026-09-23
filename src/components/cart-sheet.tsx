import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cartCount, cartSubtotal, useCart } from "@/lib/store";
import { euro } from "@/lib/utils";

export function CartSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const subtotal = cartSubtotal(lines);
  const count = cartCount(lines);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Warenkorb</SheetTitle>
          <SheetDescription>
            {count === 0
              ? "Noch leer — Zeit für einen Döner."
              : `${count} ${count === 1 ? "Artikel" : "Artikel"}`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col">
          {lines.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
              <ShoppingBag className="size-8 text-subtle" />
              <p className="max-w-xs text-sm text-muted">
                Dein Korb ist leer. Auf der Speisekarte wartet der Klassiker.
              </p>
              <Button asChild onClick={() => onOpenChange(false)}>
                <Link to="/menu">Zur Speisekarte</Link>
              </Button>
            </div>
          ) : (
            <>
              <ul className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 pb-4">
                {lines.map((line) => (
                  <li key={line.lineId} className="flex gap-3">
                    <img
                      src={line.image}
                      alt=""
                      className="size-16 shrink-0 rounded-sm object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium">{line.name}</p>
                        <p className="tabular-nums text-sm">
                          {euro(line.unitPrice * line.qty)}
                        </p>
                      </div>
                      {line.options.length > 0 && (
                        <p className="mt-0.5 truncate text-xs text-muted">
                          {line.options.join(" · ")}
                        </p>
                      )}
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          className="flex size-9 items-center justify-center rounded-md bg-surface-2 text-fg"
                          onClick={() => setQty(line.lineId, line.qty - 1)}
                          aria-label="Weniger"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-6 text-center tabular-nums text-sm">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          className="flex size-9 items-center justify-center rounded-md bg-surface-2 text-fg"
                          onClick={() => setQty(line.lineId, line.qty + 1)}
                          aria-label="Mehr"
                        >
                          <Plus className="size-3.5" />
                        </button>
                        <button
                          type="button"
                          className="ml-auto flex size-9 items-center justify-center rounded-md text-muted hover:text-fg"
                          onClick={() => remove(line.lineId)}
                          aria-label="Entfernen"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t border-border p-6">
                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="text-muted">Zwischensumme</span>
                  <span className="tabular-nums font-medium">{euro(subtotal)}</span>
                </div>
                <Separator className="mb-4" />
                <Button asChild className="w-full" size="lg">
                  <Link to="/checkout" onClick={() => onOpenChange(false)}>
                    Zur Kasse
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
