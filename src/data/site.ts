export const SITE = {
  name: "NewJeans",
  ip: "newjeans.lat",
  url: "https://newjeans.lat",
  discord: "https://discord.gg/NJqQCEX7mj",
  store: "https://store.newjeans.lat",
  logo: "/assets/njz-logo.png",
} as const;

/** Secciones del header y del footer, en orden de aparición. */
export const NAV = [
  { href: "#modalidades", label: "Modalidades" },
  { href: "#tops", label: "Tops" },
  { href: "#tienda", label: "Tienda" },
  { href: "#blog", label: "Blog" },
  { href: "#faq", label: "FAQ" },
] as const;
