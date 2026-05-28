import Image from "next/image";

interface NavigationLink {
  label: string;
  href: string;
}

interface NavigationProps {
  brand?: string;
  links: NavigationLink[];
  ctaText: string;
  onCtaClick?: () => void;
}

function Navigation({ brand, links, ctaText, onCtaClick }: NavigationProps) {
  return (
    <nav className="fixed w-full px-8 py-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image
          src="/logo.webp"
          alt="NewJeans Logo"
          width={40}
          height={40}
          className="ml-6 object-contain scale-200"
        />
        {brand && (
          <div className="text-2xl font-bold text-[var(--color-text)]">
            {brand}
          </div>
        )}
      </div>
      <div className="flex items-center gap-8">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.href}
            className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
          >
            {link.label}
          </a>
        ))}
        {onCtaClick ? (
          <button
            onClick={onCtaClick}
            className="px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-light)] transition-colors"
          >
            {ctaText}
          </button>
        ) : (
          <span className="px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white font-semibold">
            {ctaText}
          </span>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
export type { NavigationProps, NavigationLink };
