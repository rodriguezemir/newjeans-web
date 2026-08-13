export type TopRow = {
  name: string;
  tag: string;
  value: string;
  kd: string;
};

export type TopBoard = {
  id: string;
  /** Texto del botón de la pestaña. */
  tab: string;
  /** Encabezado de la columna de métrica. */
  metric: string;
  rows: TopRow[];
};

const row = ([name, tag, value, kd]: [string, string, string, string]): TopRow => ({
  name,
  tag,
  value,
  kd,
});

export const TOPS: TopBoard[] = [
  {
    id: "kills",
    tab: "Kills FFA Sword",
    metric: "Kills",
    rows: [
      ["Hyeinnn", "NJZ", "4.812", "6.4"],
      ["zRoyalMC", "ARG", "4.377", "5.1"],
      ["Danielito_", "CHL", "3.996", "4.8"],
      ["MinjiOnTop", "NJZ", "3.541", "4.2"],
      ["Kaptn", "PER", "3.220", "3.9"],
      ["LaCaparrita", "ARG", "2.987", "3.5"],
      ["ElBrayan09", "COL", "2.744", "3.1"],
      ["Haerinz", "CHL", "2.510", "2.9"],
      ["xSantii", "ARG", "2.301", "2.7"],
      ["Tokki", "NJZ", "2.115", "2.4"],
    ].map((r) => row(r as [string, string, string, string])),
  },
  {
    id: "wins",
    tab: "Wins UHC",
    metric: "Victorias",
    rows: [
      ["Danielito_", "CHL", "38", "5.2"],
      ["Kaptn", "PER", "34", "4.7"],
      ["Hyeinnn", "NJZ", "31", "6.1"],
      ["ElBrayan09", "COL", "29", "3.4"],
      ["zRoyalMC", "ARG", "27", "4.9"],
      ["Haerinz", "CHL", "24", "3.0"],
      ["MinjiOnTop", "NJZ", "22", "4.1"],
      ["LaCaparrita", "ARG", "19", "3.6"],
      ["Tokki", "NJZ", "17", "2.5"],
      ["xSantii", "ARG", "15", "2.8"],
    ].map((r) => row(r as [string, string, string, string])),
  },
  {
    id: "streak",
    tab: "Rachas",
    metric: "Racha máx.",
    rows: [
      ["MinjiOnTop", "NJZ", "87", "4.2"],
      ["Hyeinnn", "NJZ", "74", "6.4"],
      ["zRoyalMC", "ARG", "69", "5.1"],
      ["Kaptn", "PER", "61", "3.9"],
      ["Danielito_", "CHL", "58", "4.8"],
      ["xSantii", "ARG", "44", "2.7"],
      ["Haerinz", "CHL", "41", "2.9"],
      ["ElBrayan09", "COL", "37", "3.1"],
      ["LaCaparrita", "ARG", "33", "3.5"],
      ["Tokki", "NJZ", "28", "2.4"],
    ].map((r) => row(r as [string, string, string, string])),
  },
];

/** Degradés que hacen de avatar mientras no haya render de skins. */
export const SKINS = [
  "bg-linear-[140deg] from-ice to-beam",
  "bg-linear-[140deg] from-flare-soft to-[#8e2e4e]",
  "bg-linear-[140deg] from-mint to-[#1e7a45]",
  "bg-linear-[140deg] from-nova to-[#5b3a94]",
  "bg-linear-[140deg] from-gold to-[#a06e12]",
  "bg-linear-[140deg] from-ink-400 to-[#3b4657]",
];

/** Oro, plata y bronce para el podio; el resto en gris. */
export function rankColor(index: number): string {
  if (index === 0) return "text-gold";
  if (index === 1) return "text-[#dce6f2]";
  if (index === 2) return "text-[#e0955c]";
  return "text-ink-600";
}
