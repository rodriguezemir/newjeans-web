// Carrusel + lightbox de la galería. Sin dependencias: scroll-snap nativo para
// el deslizamiento y <dialog> para la vista ampliada (foco, Esc y backdrop
// resueltos por el navegador). Todo se resuelve desde el contenedor de la
// galería, así que dos instancias en la misma página no se pisan.

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

// Posición de una foto dentro del track, medida en píxeles de contenido. No
// sirve offsetLeft: depende del offsetParent y no descuenta el scroll propio.
const offsetInTrack = (track: HTMLElement, item: HTMLElement) => {
  const styles = window.getComputedStyle(track);
  const start =
    track.getBoundingClientRect().left +
    track.clientLeft +
    Number.parseFloat(styles.paddingLeft || "0");
  return item.getBoundingClientRect().left - start + track.scrollLeft;
};

const cardStep = (track: HTMLElement, items: HTMLElement[]) => {
  const [first, second] = items;
  if (first && second) {
    return offsetInTrack(track, second) - offsetInTrack(track, first);
  }
  return first?.offsetWidth ?? 0;
};

const initCarousel = (root: ParentNode, track: HTMLElement) => {
  const items = Array.from(
    track.querySelectorAll<HTMLElement>("[data-galeria-item]"),
  );
  if (items.length === 0) return;

  const prev = root.querySelector<HTMLButtonElement>("[data-galeria-prev]");
  const next = root.querySelector<HTMLButtonElement>("[data-galeria-next]");
  const counter = root.querySelector<HTMLElement>("[data-galeria-counter]");

  // Las cards tienen ancho igual, así que alcanza con medir el paso una vez (y
  // volver a medirlo si cambia el tamaño de la ventana) en lugar de pedir
  // geometría por cada evento de scroll.
  let step = cardStep(track, items) || 1;

  const nearestIndex = () => {
    if (step <= 0) return 0;
    const index = Math.round(track.scrollLeft / step);
    return Math.min(Math.max(index, 0), items.length - 1);
  };

  const scrollByCard = (direction: number) => {
    track.scrollBy({
      left: direction * step,
      behavior: prefersReducedMotion.matches ? "auto" : "smooth",
    });
  };

  const sync = () => {
    const max = track.scrollWidth - track.clientWidth;
    if (prev) prev.disabled = track.scrollLeft <= 2;
    if (next) next.disabled = track.scrollLeft >= max - 2;
    if (counter) {
      counter.textContent = `${nearestIndex() + 1} / ${items.length}`;
    }
  };

  prev?.addEventListener("click", () => scrollByCard(-1));
  next?.addEventListener("click", () => scrollByCard(1));
  track.addEventListener("scroll", sync, { passive: true });
  track.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByCard(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByCard(1);
    }
  });

  // El snap puede cambiar el scroll sin que el usuario toque nada (resize).
  window.addEventListener("resize", () => {
    step = cardStep(track, items) || 1;
    sync();
  });

  track.scrollLeft = 0;
  sync();
};

const initLightbox = (root: ParentNode, track: HTMLElement) => {
  const dialog = root.querySelector<HTMLDialogElement>(
    "[data-galeria-lightbox]",
  );
  const inner = dialog?.querySelector<HTMLElement>("[data-galeria-inner]");
  const full = dialog?.querySelector<HTMLImageElement>("[data-galeria-full]");
  const caption = dialog?.querySelector<HTMLElement>("[data-galeria-caption]");
  const closeButton = dialog?.querySelector<HTMLButtonElement>(
    "[data-galeria-close]",
  );
  if (!dialog || !inner || !full) return;

  const items = Array.from(
    track.querySelectorAll<HTMLElement>("[data-galeria-item]"),
  );
  if (items.length === 0) return;

  let current = 0;
  let previousOverflow = "";
  let previousPadding = "";

  const lockScroll = () => {
    // Compensa el ancho de la barra de scroll para que la página no salte.
    const gap = window.innerWidth - document.documentElement.clientWidth;
    previousOverflow = document.body.style.overflow;
    previousPadding = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
  };

  const unlockScroll = () => {
    document.body.style.overflow = previousOverflow;
    document.body.style.paddingRight = previousPadding;
  };

  const paint = () => {
    const item = items[current];
    const name = item.dataset.name ?? "";
    full.src = item.dataset.src ?? "";
    if (caption) {
      caption.textContent = `${current + 1} / ${items.length} — ${name}`;
    }
  };

  const show = (index: number) => {
    current = (index + items.length) % items.length;
    paint();
    if (!dialog.open) {
      dialog.showModal();
      lockScroll();
    }
  };

  items.forEach((item, index) => {
    item.addEventListener("click", () => show(index));
  });

  dialog
    .querySelector("[data-galeria-lightbox-prev]")
    ?.addEventListener("click", () => show(current - 1));
  dialog
    .querySelector("[data-galeria-lightbox-next]")
    ?.addEventListener("click", () => show(current + 1));
  closeButton?.addEventListener("click", () => dialog.close());

  // Click fuera de la foto: el <dialog> ocupa casi toda la pantalla, así que
  // hay que comparar contra el contenido y no contra el propio dialog.
  dialog.addEventListener("click", (event) => {
    if (!inner.contains(event.target as Node)) dialog.close();
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      show(current - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      show(current + 1);
    }
  });

  dialog.addEventListener("close", unlockScroll);
};

document.querySelectorAll<HTMLElement>("[data-galeria]").forEach((root) => {
  // El script podría evaluarse dos veces (navegación con View Transitions).
  if (root.dataset.galeriaReady === "true") return;
  const track = root.querySelector<HTMLElement>("[data-galeria-track]");
  if (!track) return;
  root.dataset.galeriaReady = "true";
  initCarousel(root, track);
  initLightbox(root, track);
});
