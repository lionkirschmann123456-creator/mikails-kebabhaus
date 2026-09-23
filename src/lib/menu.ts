export type CategoryId =
  | "doener"
  | "dueruem"
  | "teller"
  | "sides"
  | "drinks"
  | "sweets";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryId;
  image: string;
  popular?: boolean;
  vegetarian?: boolean;
  spicy?: boolean;
  customizable?: boolean;
  badge?: string;
};

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "doener", label: "Döner" },
  { id: "dueruem", label: "Dürüm" },
  { id: "teller", label: "Teller" },
  { id: "sides", label: "Beilagen" },
  { id: "drinks", label: "Getränke" },
  { id: "sweets", label: "Süßes" },
];

export const MEATS = [
  { id: "kalb", label: "Kalb", extra: 0 },
  { id: "huhn", label: "Hähnchen", extra: 0 },
  { id: "gemischt", label: "Gemischt", extra: 0.5 },
  { id: "falafel", label: "Falafel", extra: 0, vegetarian: true },
] as const;

export const SIZES = [
  { id: "normal", label: "Normal", extra: 0 },
  { id: "gross", label: "Groß", extra: 2 },
] as const;

export const SAUCES = [
  { id: "knoblauch", label: "Knoblauch" },
  { id: "kraeuter", label: "Kräuter" },
  { id: "cocktail", label: "Cocktail" },
  { id: "scharf", label: "Scharf" },
] as const;

export const SALADS = [
  { id: "salat", label: "Salat" },
  { id: "zwiebel", label: "Zwiebel" },
  { id: "rotkraut", label: "Rotkraut" },
  { id: "tomate", label: "Tomate" },
  { id: "gurke", label: "Gurke" },
] as const;

export const EXTRAS = [
  { id: "kaese", label: "Käse", extra: 1 },
  { id: "fleisch", label: "Extra Fleisch", extra: 2.5 },
  { id: "pommes", label: "Pommes im Brot", extra: 1.5 },
] as const;

export const MENU: MenuItem[] = [
  {
    id: "doener-klassik",
    name: "Döner Klassik",
    description:
      "Vom Spieß, im warmen Fladenbrot. Salat, Soße — so, wie Mikail ihn isst.",
    price: 8.5,
    category: "doener",
    image: "/food/doener.jpg",
    popular: true,
    customizable: true,
  },
  {
    id: "super-doener",
    name: "Super Döner",
    description: "Doppelt Fleisch, extra Soße. Für den großen Hunger nach der Schicht.",
    price: 10.9,
    category: "doener",
    image: "/food/doener.jpg",
    customizable: true,
    badge: "Heute",
  },
  {
    id: "doener-box",
    name: "Döner Box",
    description: "Fleisch über Pommes, Soße und Rotkraut. Gabel statt Krümel.",
    price: 9.5,
    category: "doener",
    image: "/food/box.jpg",
    popular: true,
    customizable: true,
  },
  {
    id: "dueruem-kalb",
    name: "Dürüm Kalb",
    description: "Yufka, knusprig gerollt. Kalbfleisch, Salat, Soße nach Wahl.",
    price: 9,
    category: "dueruem",
    image: "/food/dueruem.jpg",
    customizable: true,
  },
  {
    id: "dueruem-huhn",
    name: "Dürüm Hähnchen",
    description: "Zartes Hähnchen vom Grill, fest gewickelt, tropft nicht — versprochen fast.",
    price: 9,
    category: "dueruem",
    image: "/food/dueruem.jpg",
    popular: true,
    customizable: true,
  },
  {
    id: "falafel-dueruem",
    name: "Falafel Dürüm",
    description: "Kichererbsen, Tahini, eingelegte Rüben, Kräuter. Ohne Fleisch, mit Charakter.",
    price: 8.5,
    category: "dueruem",
    image: "/food/falafel.jpg",
    vegetarian: true,
    customizable: true,
  },
  {
    id: "teller-doener",
    name: "Döner Teller",
    description: "Reis, Fleisch, Salat, Grillgemüse, Joghurt. Der volle Teller.",
    price: 13.9,
    category: "teller",
    image: "/food/teller.jpg",
    popular: true,
    customizable: true,
  },
  {
    id: "teller-gemischt",
    name: "Gemischter Teller",
    description: "Kalb und Hähnchen, Reis, Salat. Zum Teilen — oder auch nicht.",
    price: 14.9,
    category: "teller",
    image: "/food/teller.jpg",
    customizable: true,
  },
  {
    id: "lahmacun",
    name: "Lahmacun",
    description: "Dünner Teig, Hack, Petersilie, Zitrone. Knusprig, sauer, richtig.",
    price: 6.5,
    category: "teller",
    image: "/food/lahmacun.jpg",
  },
  {
    id: "pommes",
    name: "Pommes",
    description: "Golden, knusprig, Paprikasalz. Ketchup oder Mayo auf Wunsch.",
    price: 3.9,
    category: "sides",
    image: "/food/pommes.jpg",
  },
  {
    id: "pommes-spezial",
    name: "Pommes Spezial",
    description: "Pommes, Knoblauchsoße, Käse, scharfe Soße. Unordentlich, wie es sein soll.",
    price: 5.9,
    category: "sides",
    image: "/food/pommes.jpg",
  },
  {
    id: "salat",
    name: "Beilagensalat",
    description: "Frisch, knackig, mit Hausdressing. Fürs Gewissen neben dem Döner.",
    price: 4.5,
    category: "sides",
    image: "/food/teller.jpg",
    vegetarian: true,
  },
  {
    id: "ayran",
    name: "Ayran",
    description: "Kalt, salzig, schaumig. Der einzige Begleiter, der zum Döner gehört.",
    price: 2.5,
    category: "drinks",
    image: "/food/ayran.jpg",
    vegetarian: true,
  },
  {
    id: "ayran-gross",
    name: "Ayran groß",
    description: "Mehr Schaum, mehr Durstlöscher. 0,5 Liter.",
    price: 3.5,
    category: "drinks",
    image: "/food/ayran.jpg",
    vegetarian: true,
  },
  {
    id: "cola",
    name: "Cola 0,33",
    description: "Kalt aus dem Kühlschrank. Glasflasche.",
    price: 2.9,
    category: "drinks",
    image: "/food/ayran.jpg",
  },
  {
    id: "wasser",
    name: "Wasser 0,5",
    description: "Still oder medium. Sag’s an der Theke — hier: still.",
    price: 2.2,
    category: "drinks",
    image: "/food/ayran.jpg",
  },
  {
    id: "baklava",
    name: "Baklava",
    description: "Pistazie, Butter, Honig. Drei Stücke, eine Pause.",
    price: 4.5,
    category: "sweets",
    image: "/food/baklava.jpg",
    vegetarian: true,
  },
];

export function getItem(id: string) {
  return MENU.find((item) => item.id === id);
}

export const HOUSE = {
  name: "Mikail's Kebabhaus",
  street: "Oranienstraße 41",
  city: "10969 Berlin",
  phone: "030 612 88 41",
  email: "bestellung@mikails-kebabhaus.de",
  hours: [
    { days: "Montag – Donnerstag", time: "11:00 – 23:00" },
    { days: "Freitag – Samstag", time: "11:00 – 01:00" },
    { days: "Sonntag", time: "12:00 – 23:00" },
  ],
  hoursShort: "Mo–Do 11–23 · Fr–Sa 11–1 · So 12–23",
  deliveryFee: 2.9,
  freeDeliveryFrom: 25,
  minDelivery: 12,
};

export const FEATURED_IDS = ["doener-klassik", "dueruem-huhn", "teller-doener"] as const;
