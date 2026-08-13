export type RankAccent = "ice" | "nova" | "gold";

export type Rank = {
  name: string;
  /** Precio en USD, pago único. */
  price: string;
  perks: string[];
  accent: RankAccent;
  /** Destaca la card y le agrega la etiqueta "Más elegido". */
  featured?: boolean;
};

export const RANKS: Rank[] = [
  {
    name: "VIP",
    price: "$8",
    perks: [
      "Prefijo VIP y color en el chat",
      "2 kits guardados extra en Practice",
      "/fix y /ptime en FFA",
    ],
    accent: "ice",
  },
  {
    name: "MVP",
    price: "$15",
    perks: [
      "Todo lo de VIP + cola prioritaria",
      "Kits ilimitados y /duel privado",
      "1 killeffect y 1 capa a elección",
      "Acceso anticipado a mapas nuevos",
    ],
    accent: "nova",
    featured: true,
  },
  {
    name: "CUSTOM",
    price: "$25",
    perks: [
      "Todo lo de MVP + prefijo a tu elección",
      "Color y nombre del rango personalizados",
      "Eventos privados y /host de UHC",
      "Slot reservado con el servidor lleno",
    ],
    accent: "gold",
  },
];

export type Extra = {
  title: string;
  description: string;
  cta: string;
  accent: "nova" | "flare";
};

export const EXTRAS: Extra[] = [
  {
    title: "Cosméticos",
    description:
      "Capas, killeffects, trails y partículas de victoria. Desde $2.99.",
    cta: "Ver catálogo",
    accent: "nova",
  },
  {
    title: "Unban / Desmute",
    description:
      "Una segunda oportunidad. No aplica a bans por cheats detectados.",
    cta: "Ver precios",
    accent: "flare",
  },
];
