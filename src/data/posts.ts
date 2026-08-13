export type Post = {
  slug: string;
  category: string;
  date: string;
  /** Fecha ISO para el <time>, que la de arriba está en formato humano. */
  datetime: string;
  readingTime: string;
  title: string;
  excerpt: string;
  /** Clases de Tailwind para la portada del card y del modal. */
  cover: string;
  body: string;
};

export const POSTS: Post[] = [
  {
    slug: "temporada-3",
    category: "Changelog",
    date: "10 ago 2026",
    datetime: "2026-08-10",
    readingTime: "3 min",
    title: "Temporada 3: nuevo ELO y arenas de NetheritePot",
    cover: "bg-linear-[140deg] from-beam to-night-800",
    excerpt:
      "Reseteamos el ELO de Practice, agregamos 6 arenas de pot y ajustamos el knockback de FFA Sword.",
    body: `Arranca la temporada 3 y con ella el reset de ELO en todas las colas ranked de Practice. Los tres primeros de cada queue se llevan el rango CHAMPION durante toda la temporada.

Cambios principales:
· 6 arenas nuevas de NetheritePot con refill instantáneo.
· Knockback de FFA Sword ajustado al comportamiento de 1.8.
· Editor de kits ahora permite 9 slots guardados para MVP y ELITE.
· Arreglado el bug de rollback al salir de un duel en medio del enderpearl.

Los premios de la temporada 2 ya se entregaron por /claim. Si te falta algo, abrí ticket en el Discord.`,
  },
  {
    slug: "bronce-a-diamante-nodebuff",
    category: "Guía",
    date: "2 ago 2026",
    datetime: "2026-08-02",
    readingTime: "6 min",
    title: "Cómo subir de Bronce a Diamante en NoDebuff",
    cover: "bg-linear-[140deg] from-ice to-night-800",
    excerpt:
      "Rotaciones de pots, control de W-tap y los tres errores que más ELO te cuestan en la cola ranked.",
    body: `Subir en NoDebuff es 70% gestión de pots y 30% aim. Empezá por acomodar tu hotbar siempre igual: espada en 1, pots en 2 y 3, comida en 9.

1. W-tap consistente antes que CPS altos. Practicá en /duel con un amigo a 6-8 CPS constantes.
2. Nunca tomes pot en el aire salvo que estés fuera de rango de espada.
3. Registrá tus derrotas: si perdés más de 3 seguidas, salí de la cola 10 minutos.

El staff hostea clínicas de NoDebuff los miércoles a las 20:00 ARG en el canal de voz del Discord.`,
  },
  {
    slug: "uhc-to3-invierno",
    category: "Torneo",
    date: "26 jul 2026",
    datetime: "2026-07-26",
    readingTime: "4 min",
    title: "UHC To3 de invierno: resultados y clips destacados",
    cover: "bg-linear-[140deg] from-mint to-night-800",
    excerpt:
      "96 jugadores, 41 minutos de partida y una final en cueva que se decidió con media manzana dorada.",
    body: `El UHC To3 de invierno cerró con 96 jugadores inscriptos y una final que nadie vio venir. El trío de Danielito_, Haerinz y Kaptn ganó en cueva a nivel 11 con un solo gapple entre los tres.

Podio:
1º Danielito_ / Haerinz / Kaptn
2º zRoyalMC / xSantii / LaCaparrita
3º Hyeinnn / MinjiOnTop / Tokki

Los clips están subidos en el canal #clips del Discord. El próximo UHC con premio en efectivo se anuncia la primera semana de septiembre.`,
  },
];
