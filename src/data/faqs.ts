export type Faq = {
  q: string;
  a: string;
};

/** Se renderizan en la sección FAQ y alimentan el JSON-LD de FAQPage. */
export const FAQS: Faq[] = [
  {
    q: "¿Cuál es la IP para entrar?",
    a: "La IP es newjeans.lat. Andá a Multijugador → Añadir servidor y pegala. Funciona en Java de 1.8 a 1.21 y en Bedrock vía Geyser en el puerto 19132.",
  },
  {
    q: "¿Necesito una versión específica de Minecraft?",
    a: "No. El servidor usa ViaVersion, así que podés entrar con cualquier cliente entre 1.8 y 1.21. Para Practice y FFA Sword recomendamos 1.8.9 por la mecánica de combate.",
  },
  {
    q: "¿Se juega bien desde mi país?",
    a: "Sí. Los nodos están en Santiago y São Paulo: 9 ms en Chile, 14 ms en Argentina, 32 ms en Perú y 44 ms en Colombia medidos sobre clientes reales.",
  },
  {
    q: "¿La tienda es pay to win?",
    a: "No. Los rangos dan cosméticos, chat, kits extra y cola prioritaria. Ningún ítem de la tienda modifica el daño, la armadura ni las pots.",
  },
  {
    q: "¿Cómo reporto a un cheater?",
    a: "Grabá el clip y abrí un ticket en el Discord del servidor con el nombre exacto del jugador y la modalidad. El staff revisa reportes con video en menos de 24 horas.",
  },
];
