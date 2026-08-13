import { SITE } from "../data/site";

const RESET_MS = 1800;

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // En contextos no seguros (http) no existe la Clipboard API.
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.append(helper);
    helper.select();
    const copied = document.execCommand("copy");
    helper.remove();
    return copied;
  }
}

document
  .querySelectorAll<HTMLButtonElement>("[data-copy-ip]")
  .forEach((button) => {
    const label = button.querySelector<HTMLElement>("[data-copy-label]");
    const idle = button.dataset.labelIdle ?? "Copiar IP";
    const done = button.dataset.labelDone ?? "¡Copiada!";
    let timer: number | undefined;

    button.addEventListener("click", async () => {
      const copied = await copyToClipboard(SITE.ip);
      if (label) label.textContent = copied ? done : "No se pudo copiar";

      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (label) label.textContent = idle;
      }, RESET_MS);
    });
  });
