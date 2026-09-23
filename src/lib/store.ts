import { create } from "zustand";
import { persist } from "zustand/middleware";
import { HOUSE } from "@/lib/menu";

export type CartLine = {
  lineId: string;
  itemId: string;
  name: string;
  qty: number;
  unitPrice: number;
  options: string[];
  image: string;
};

export type Fulfillment = "abholen" | "lieferung";

export type Order = {
  id: string;
  createdAt: number;
  fulfillment: Fulfillment;
  customer: { name: string; phone: string; address?: string };
  notes: string;
  lines: CartLine[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  etaMin: number;
};

type CartState = {
  lines: CartLine[];
  lastOrder: Order | null;
  addLine: (line: Omit<CartLine, "lineId">) => void;
  setQty: (lineId: string, qty: number) => void;
  remove: (lineId: string) => void;
  clear: () => void;
  placeOrder: (order: Order) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      lastOrder: null,
      addLine: (line) =>
        set({
          lines: [...get().lines, { ...line, lineId: crypto.randomUUID() }],
        }),
      setQty: (lineId, qty) =>
        set({
          lines:
            qty <= 0
              ? get().lines.filter((l) => l.lineId !== lineId)
              : get().lines.map((l) => (l.lineId === lineId ? { ...l, qty } : l)),
        }),
      remove: (lineId) =>
        set({ lines: get().lines.filter((l) => l.lineId !== lineId) }),
      clear: () => set({ lines: [] }),
      placeOrder: (order) => set({ lastOrder: order, lines: [] }),
    }),
    { name: "mikails-kebabhaus-cart" },
  ),
);

export function cartCount(lines: CartLine[]) {
  return lines.reduce((n, l) => n + l.qty, 0);
}

export function cartSubtotal(lines: CartLine[]) {
  return lines.reduce((n, l) => n + l.unitPrice * l.qty, 0);
}

export function deliveryFeeFor(subtotal: number, fulfillment: Fulfillment) {
  if (fulfillment !== "lieferung") return 0;
  if (subtotal >= HOUSE.freeDeliveryFrom) return 0;
  return HOUSE.deliveryFee;
}
