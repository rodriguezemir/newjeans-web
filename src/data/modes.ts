export type ModeAccent = "ice" | "flare" | "mint" | "nova";

export type Mode = {
  /** Comando del hub que lleva a la modalidad. */
  cmd: string;
  title: string;
  description: string;
  tags: string[];
  accent: ModeAccent;
};

export const MODES: Mode[] = [
  {
    cmd: "/practice",
    title: "Practice",
    description:
      "Ranked y unranked en NoDebuff, Gapple, BuildUHC, Sumo y Boxing. Editor de kits, ELO por queue y duels 2v2.",
    tags: ["Ranked ELO", "Editor de kits"],
    accent: "ice",
  },
  {
    cmd: "/ffa",
    title: "FFA Sword",
    description:
      "Espada, comida y nada más. Killstreaks con recompensas, mapas que rotan cada 2 horas y leaderboard de kills en vivo.",
    tags: ["Killstreaks", "Mapas rotativos"],
    accent: "flare",
  },
  {
    cmd: "/uhc",
    title: "UHC",
    description:
      "Partidas de 100 jugadores todos los sábados 21:00 ARG. Solo, To2 y To3 con scenarios votados por la comunidad.",
    tags: ["Scenarios", "Sáb 21:00"],
    accent: "mint",
  },
  {
    cmd: "/pot",
    title: "NetheritePot",
    description:
      "Netherite full, pots y crystal a discreción. Arenas 1v1 y 2v2 con refill instantáneo y stats de accuracy.",
    tags: ["1v1 / 2v2", "Refill instantáneo"],
    accent: "nova",
  },
];

/** Latencias medidas sobre clientes reales durante la última semana. */
export const LATENCY = [
  { country: "Chile", ms: "9 ms", tone: "text-mint" },
  { country: "Argentina", ms: "14 ms", tone: "text-mint" },
  { country: "Perú", ms: "32 ms", tone: "text-ice" },
  { country: "Colombia", ms: "44 ms", tone: "text-ice" },
];
