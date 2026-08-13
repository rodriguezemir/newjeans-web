import { SITE } from "../data/site";

const ENDPOINT = `https://api.mcsrvstat.us/3/${SITE.ip}`;
const REFRESH_MS = 60_000;
const OFFLINE = "—";

const targets = document.querySelectorAll<HTMLElement>("[data-online]");

async function refresh(): Promise<void> {
  try {
    const response = await fetch(ENDPOINT, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(`mcsrvstat respondió ${response.status}`);

    const data = await response.json();
    const players: unknown = data?.online ? data?.players?.online : null;

    const text =
      typeof players === "number" ? players.toLocaleString("es-AR") : OFFLINE;
    targets.forEach((el) => {
      el.textContent = text;
    });
  } catch {
    // El servidor puede estar caído o la API sin responder: dejamos el guion.
    targets.forEach((el) => {
      if (!el.textContent?.trim()) el.textContent = OFFLINE;
    });
  }
}

if (targets.length) {
  void refresh();
  window.setInterval(() => void refresh(), REFRESH_MS);
}
