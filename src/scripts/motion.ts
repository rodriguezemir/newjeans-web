import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

/** Alto real del header sticky, para que el ancla no quede tapada. */
function headerOffset(): number {
  return document.querySelector("header")?.getBoundingClientRect().height ?? 68;
}

function initSmoothScroll(): void {
  // El scroll suave nativo pelea con ScrollToPlugin (los dos escriben la
  // posición en cada frame). Como acá lo maneja GSAP, apagamos el de CSS —
  // que queda sólo como fallback para cuando este script no corre.
  document.documentElement.style.scrollBehavior = "auto";

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;

    const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
    const hash = link?.getAttribute("href");
    if (!hash || hash === "#") return;

    const section = document.querySelector(hash);
    if (!section) return;

    event.preventDefault();
    gsap.to(window, {
      duration: 1.1,
      ease: "power3.inOut",
      scrollTo: { y: section, offsetY: headerOffset(), autoKill: true },
    });
  });
}

function initHero(): void {
  const hero = document.querySelector("[data-hero]");
  if (hero) {
    gsap.from(Array.from(hero.children), {
      y: 34,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.09,
      delay: 0.1,
    });
  }

  const grid = document.querySelector("[data-parallax]");
  if (grid) {
    gsap.to(grid, {
      yPercent: 18,
      ease: "none",
      scrollTrigger: {
        trigger: "#top",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }
}

type RevealOptions = {
  y?: number;
  scale?: number;
  duration?: number;
  stagger?: number;
};

/**
 * Entrada al hacer scroll. Va con fromTo y no con from: un `from` con
 * ScrollTrigger vuelve a su estado inicial en cada refresh (por ejemplo cuando
 * terminan de cargar las fuentes) y deja las cards invisibles para siempre.
 */
function revealOnScroll(
  targets: Element | Element[],
  trigger: Element,
  { y = 40, scale = 1, duration = 0.8, stagger = 0 }: RevealOptions = {},
): void {
  gsap.fromTo(
    targets,
    { y, scale, opacity: 0 },
    {
      y: 0,
      scale: 1,
      opacity: 1,
      duration,
      stagger,
      ease: "power3.out",
      overwrite: "auto",
      scrollTrigger: { trigger, start: "top 85%", once: true },
    },
  );
}

/** Revela cada elemento por separado, disparado por sí mismo. */
function revealEach(selector: string, options?: RevealOptions): void {
  document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    revealOnScroll(el, el, options);
  });
}

/** Revela un grupo en cascada, disparado por su sección contenedora. */
function revealGroup(
  container: string,
  items: string,
  options?: RevealOptions,
): void {
  const section = document.querySelector(container);
  const elements = section?.querySelectorAll<HTMLElement>(items);
  if (!section || !elements?.length) return;

  revealOnScroll(Array.from(elements), section, options);
}

/** Cuenta hasta el número ya renderizado, conservando sufijos como "ms" o "%". */
function initCounters(): void {
  document.querySelectorAll<HTMLElement>("[data-countup]").forEach((el) => {
    const raw = el.textContent?.trim() ?? "";
    const target = Number.parseFloat(raw.replace(/[^0-9.]/g, ""));
    if (!Number.isFinite(target)) return;

    const suffix = raw.replace(/[0-9.,]/g, "");
    const decimals = raw.includes("%") ? 1 : 0;
    const counter = { value: 0 };

    gsap.to(counter, {
      value: target,
      duration: 1.4,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
      onUpdate: () => {
        el.textContent =
          counter.value
            .toFixed(decimals)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + suffix;
      },
    });
  });
}

if (!prefersReducedMotion) {
  initSmoothScroll();
  initHero();
  initCounters();

  revealEach("[data-reveal-heading]", { y: 28 });
  revealEach("[data-reveal]", { y: 44 });

  revealGroup("#modalidades", "[data-mode-card]", {
    y: 56,
    duration: 0.75,
    stagger: 0.08,
  });
  revealGroup("#tienda", "[data-reveal-card]", {
    y: 50,
    scale: 0.97,
    duration: 0.7,
    stagger: 0.09,
  });
  revealGroup("#blog", "[data-reveal-card]", { y: 50, scale: 0.98 });
  revealGroup("#faq", "[data-reveal-card]", {
    y: 22,
    duration: 0.55,
    stagger: 0.06,
  });

  // Outfit y JetBrains Mono llegan por CDN y corren todo el layout al aplicarse.
  // Sin este refresh, ScrollTrigger se queda con las posiciones del render
  // inicial y dispara los reveals donde ya no está la sección.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
