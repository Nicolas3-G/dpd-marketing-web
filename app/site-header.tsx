"use client";

import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import { createPortal } from "react-dom";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent,
  type RefObject,
} from "react";

const DARK_SECTION_IDS = [
  "transformation",
  "blog-featured",
  "contact-hero",
] as const;

/** Matches `h-20` on the nav row */
const HEADER_HEIGHT_PX = 80;

function headerOverlapsSection(section: HTMLElement): boolean {
  const rect = section.getBoundingClientRect();
  return rect.top < HEADER_HEIGHT_PX && rect.bottom > 0;
}

type MegaLink = {
  label: string;
  href: string;
  preview: {
    eyebrow: string;
    title: string;
    image: string;
    imageAlt: string;
  };
};

const platformMegaLinks: MegaLink[] = [
  {
    label: "Framework",
    href: "/framework",
    preview: {
      eyebrow: "Framework",
      title: "All about the DPD Framework",
      image: "/science-cards/card-1.jpg",
      imageAlt: "",
    },
  },
  {
    label: "Science",
    href: "/science",
    preview: {
      eyebrow: "Science",
      title: "The research behind it",
      image: "/science-cards/card-2.jpg",
      imageAlt: "",
    },
  },
];

const productsMegaLinks: MegaLink[] = [
  // {
  //   label: "Reports",
  //   href: "/reports",
  //   preview: {
  //     eyebrow: "Reports",
  //     title: "Research reports and insights",
  //     image: "/scroll-cards/card-4.jpg",
  //     imageAlt: "",
  //   },
  // },
  {
    label: "Webinars",
    href: "/webinars",
    preview: {
      eyebrow: "Webinars",
      title: "Live sessions and recorded talks",
      image: "/scroll-cards/card-5.jpg",
      imageAlt: "",
    },
  },
  {
    label: "Books",
    href: "/books",
    preview: {
      eyebrow: "Books",
      title: "Publications from the DPD team",
      image: "/products/DPD Book Mockup.png",
      imageAlt: "",
    },
  },
];

const companyMegaLinks: MegaLink[] = [
  {
    label: "About",
    href: "/about",
    preview: {
      eyebrow: "About DPD Framework",
      title: "Who we are, what we do, and why it matters",
      image: "/scroll-cards/card-1.jpg",
      imageAlt: "About DPD Framework",
    },
  },
  {
    label: "Team",
    href: "/team",
    preview: {
      eyebrow: "Team",
      title: "The people who make it work",
      image: "/scroll-cards/card-2.jpg",
      imageAlt: "",
    },
  },
  {
    label: "Blog",
    href: "/blog",
    preview: {
      eyebrow: "Blog",
      title: "Latest news, articles, & events",
      image: "/scroll-cards/card-3.jpg",
      imageAlt: "",
    },
  },
  {
    label: "Contact",
    href: "/contact",
    preview: {
      eyebrow: "Contact",
      title: "How to reach us",
      image: "/contact-bg.jpg",
      imageAlt: "",
    },
  },
];

type LineState = { left: number; width: number; active: boolean };

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

const MEGA_MENU_TOP_GAP_PX = 8;
/** Narrow the panel on the right (px shorter than nav row start → Take Survey span). */
const MEGA_MENU_RIGHT_TRIM_PX = 120;

/** Matches `duration-300` on the mega menu backdrop overlay */
const MEGA_MENU_BACKDROP_FADE_MS = 300;

/** Nav column height for the fullest menu (Company); shorter menus stretch link rows to match. */
const MEGA_MENU_NAV_ROWS = companyMegaLinks.length;

type MegaLayout = { left: number; width: number; top: number };

type OpenMegaMenu = "platform" | "products" | "company" | null;

function MegaMenuNavItem({
  triggerLabel,
  triggerHref,
  triggerRef,
  links,
  panelId,
  ariaLabel,
  navLinkClass,
  onLinkMouseEnter,
  navRef,
  megaLeftRef,
  ctaRef,
  open,
  onActivate,
  onDismiss,
}: {
  triggerLabel: string;
  triggerHref: string;
  triggerRef?: RefObject<HTMLAnchorElement | null>;
  links: MegaLink[];
  panelId: string;
  ariaLabel: string;
  navLinkClass: string;
  onLinkMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  navRef: RefObject<HTMLElement | null>;
  megaLeftRef: RefObject<HTMLAnchorElement | null>;
  ctaRef: RefObject<HTMLAnchorElement | null>;
  open: boolean;
  onActivate: () => void;
  onDismiss: () => void;
}) {
  const [mega, setMega] = useState<MegaLayout | null>(null);
  const [megaContentVisible, setMegaContentVisible] = useState(false);
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);
  const activePreview = links[activePreviewIndex]?.preview;

  const measureMega = useCallback(() => {
    const nav = navRef.current;
    const leftAnchor = megaLeftRef.current;
    const cta = ctaRef.current;
    if (!nav || !leftAnchor || !cta) {
      setMega(null);
      return;
    }
    const navR = nav.getBoundingClientRect();
    const leftR = leftAnchor.getBoundingClientRect();
    const ctaR = cta.getBoundingClientRect();
    const width = ctaR.left - leftR.left - MEGA_MENU_RIGHT_TRIM_PX;
    if (width < 120) {
      setMega(null);
      return;
    }
    setMega({
      left: leftR.left,
      width,
      top: navR.bottom + MEGA_MENU_TOP_GAP_PX,
    });
  }, [navRef, megaLeftRef, ctaRef]);

  useLayoutEffect(() => {
    if (!open) {
      setMega(null);
      return;
    }
    measureMega();
    window.addEventListener("resize", measureMega);
    window.addEventListener("scroll", measureMega, { passive: true });
    return () => {
      window.removeEventListener("resize", measureMega);
      window.removeEventListener("scroll", measureMega);
    };
  }, [open, measureMega]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onDismiss();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onDismiss]);

  useEffect(() => {
    if (!open) {
      setMegaContentVisible(false);
      setActivePreviewIndex(0);
      return;
    }
    setMegaContentVisible(false);
    let timeoutId: number | undefined;
    const rafId = requestAnimationFrame(() => {
      timeoutId = window.setTimeout(() => setMegaContentVisible(true), 90);
    });
    return () => {
      cancelAnimationFrame(rafId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [open]);

  const megaContentFadeClass = `transition-opacity duration-300 ease-out ${
    megaContentVisible ? "opacity-100" : "opacity-0"
  }`;
  const padNavToCompanyHeight = links.length < MEGA_MENU_NAV_ROWS;

  return (
    <div
      className="relative inline-flex self-stretch"
      onMouseEnter={onActivate}
      onFocusCapture={onActivate}
    >
      <a
        ref={triggerRef}
        href={triggerHref}
        className={navLinkClass}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="true"
        onMouseEnter={onLinkMouseEnter}
      >
        {triggerLabel}
      </a>
      {open && mega ? (
        <>
          <div
            aria-hidden
            className="fixed z-69 bg-transparent"
            style={{
              left: mega.left,
              width: mega.width,
              top: mega.top - MEGA_MENU_TOP_GAP_PX,
              height: MEGA_MENU_TOP_GAP_PX,
            }}
          />
          <div
            id={panelId}
            data-mega-panel
            className="fixed z-70"
            style={{ left: mega.left, width: mega.width, top: mega.top }}
            role="region"
            aria-label={ariaLabel}
          >
            <div className="items-stretch overflow-hidden rounded-md bg-background shadow-[0_24px_80px_rgba(0,0,0,0.12)] md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
              <nav
                className={`flex min-h-0 flex-col px-6 py-2 md:min-h-86 md:px-8 md:py-3 ${megaContentFadeClass}`}
              >
                <div className="flex flex-col divide-y divide-black/10">
                  {links.map((row, index) => (
                    <a
                      key={row.label}
                      href={row.href}
                      className={`group flex w-full items-center justify-start gap-2 py-5 custom-body transition-colors first:pt-6 last:pb-6 md:py-6 ${
                        activePreviewIndex === index
                          ? "text-custom-black"
                          : "text-custom-black/55 hover:text-custom-black/70"
                      }`}
                      onMouseEnter={() => setActivePreviewIndex(index)}
                      onFocus={() => setActivePreviewIndex(index)}
                    >
                      <span className="min-w-0">{row.label}</span>
                      <span
                        aria-hidden
                        className="inline-flex shrink-0 -translate-x-1 transform-gpu opacity-0 transition-[translate,opacity] duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                      >
                        <FaArrowRight className="size-3.5 text-current md:size-4" />
                      </span>
                    </a>
                  ))}
                </div>
                {padNavToCompanyHeight ? (
                  <div className="hidden min-h-0 flex-1 md:block" aria-hidden />
                ) : null}
              </nav>
              <div
                className={`self-start px-5 pt-5 pb-3 md:px-6 md:pt-6 md:pb-4 ${megaContentFadeClass}`}
              >
                {activePreview ? (
                  <a
                    key={links[activePreviewIndex].href}
                    href={links[activePreviewIndex].href}
                    className="group/card block rounded-md outline-offset-2 focus-visible:outline-2 focus-visible:outline-custom-black/80"
                  >
                    <div className="relative h-40 w-full overflow-hidden rounded-md bg-custom-black/5 md:h-48">
                      <Image
                        src={activePreview.image}
                        alt={activePreview.imageAlt}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 420px"
                      />
                    </div>
                    <p className="mt-4 custom-label uppercase tracking-[0.18em] text-light transition-opacity duration-200">
                      {activePreview.eyebrow}
                    </p>
                    <p className="mt-1.5 custom-body-bold tracking-tight text-custom-black transition-opacity duration-200">
                      {activePreview.title}
                    </p>
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export function SiteHeader() {
  const [navOnDark, setNavOnDark] = useState(false);
  const [menuHover, setMenuHover] = useState(false);
  const [openMegaMenu, setOpenMegaMenu] = useState<OpenMegaMenu>(null);
  const [backdropMounted, setBackdropMounted] = useState(false);
  const [backdropFadeIn, setBackdropFadeIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [line, setLine] = useState<LineState>({
    left: 0,
    width: 0,
    active: false,
  });

  const navRef = useRef<HTMLElement | null>(null);
  const megaMenuLeftRef = useRef<HTMLAnchorElement | null>(null);
  const ctaNavRef = useRef<HTMLAnchorElement | null>(null);
  const lineTargetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const megaMenuBackdropActive = openMegaMenu !== null;

  useEffect(() => {
    if (megaMenuBackdropActive) {
      setBackdropMounted(true);
      setBackdropFadeIn(false);
      let raf2 = 0;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setBackdropFadeIn(true));
      });
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
      };
    }
    setBackdropFadeIn(false);
    const hideId = window.setTimeout(
      () => setBackdropMounted(false),
      MEGA_MENU_BACKDROP_FADE_MS,
    );
    return () => window.clearTimeout(hideId);
  }, [megaMenuBackdropActive]);

  function handleMegaNavGroupMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
    const next = e.relatedTarget;
    if (next instanceof Node) {
      if (e.currentTarget.contains(next)) return;
      if (next instanceof Element && next.closest("[data-mega-panel]")) return;
    }
    setOpenMegaMenu(null);
  }

  function handleMegaNavGroupBlurCapture(e: FocusEvent<HTMLDivElement>) {
    const next = e.relatedTarget;
    if (!(next instanceof Node) || !e.currentTarget.contains(next)) {
      setOpenMegaMenu(null);
    }
  }

  useEffect(() => {
    function update() {
      const overlaps = DARK_SECTION_IDS.some((id) => {
        const section = document.getElementById(id);
        return section ? headerOverlapsSection(section) : false;
      });
      setNavOnDark(overlaps);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const syncLine = useCallback((el: HTMLElement) => {
    const nav = navRef.current;
    if (!nav) return;
    lineTargetRef.current = el;
    const nr = nav.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    setLine({
      left: er.left - nr.left,
      width: er.width,
      active: true,
    });
  }, []);

  const clearLine = useCallback(() => {
    lineTargetRef.current = null;
    setLine((prev) => ({ ...prev, active: false }));
  }, []);

  useEffect(() => {
    if (!line.active) return;

    function remeasure() {
      const nav = navRef.current;
      const target = lineTargetRef.current;
      if (!nav || !target) return;
      const nr = nav.getBoundingClientRect();
      const er = target.getBoundingClientRect();
      setLine({
        left: er.left - nr.left,
        width: er.width,
        active: true,
      });
    }

    window.addEventListener("resize", remeasure);
    return () => window.removeEventListener("resize", remeasure);
  }, [line.active]);

  const barSolid = menuHover;

  const headerSurface = barSolid
    ? "border-b border-custom-black bg-background shadow-[0_9px_22px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition-[border-color,box-shadow,background-color] duration-300 ease-out"
    : navOnDark
      ? "border-b border-gray-400/90 bg-transparent shadow-[0_9px_22px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-[border-color,box-shadow,background-color] duration-300 ease-out"
      : "border-b border-custom-black bg-background/45 shadow-[0_9px_22px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition-[border-color,box-shadow,background-color] duration-300 ease-out";

  const logoClass =
    navOnDark && !barSolid
      ? "text-xl font-extrabold tracking-[-0.04em] text-white transition-colors duration-300 ease-out"
      : "text-xl font-extrabold tracking-[-0.04em] text-custom-black transition-colors duration-300 ease-out";

  const navRowClass =
    navOnDark && !barSolid
      ? "hidden items-stretch gap-9 pl-20 text-[0.63rem] font-black uppercase tracking-[0.22em] text-white transition-colors duration-300 ease-out md:flex"
      : "hidden items-stretch gap-9 pl-20 text-[0.63rem] font-black uppercase tracking-[0.22em] text-custom-black transition-colors duration-300 ease-out md:flex";

  const navLinkClass =
    navOnDark && !barSolid
      ? "inline-flex items-center custom-caption self-stretch transition-colors duration-300 ease-out hover:text-white/75"
      : "inline-flex items-center custom-caption self-stretch transition-colors duration-300 ease-out hover:text-custom-black/65";

  const ctaPillClass =
    navOnDark && !barSolid
      ? "inline-flex h-9 items-center justify-center rounded-full border border-white/70 bg-transparent px-7 text-base font-normal text-white transition-[color,border-color,background-color] duration-300 ease-out group-hover:border-white group-hover:bg-white group-hover:text-custom-black group-focus-visible:border-white group-focus-visible:bg-white group-focus-visible:text-custom-black"
      : "inline-flex h-9 items-center justify-center rounded-full border border-custom-black bg-custom-black px-7 text-base font-normal text-white opacity-100 transition-[opacity] duration-300 ease-out group-hover:opacity-50 group-focus-visible:opacity-50";

  const ctaShellClass =
    "group ml-auto flex shrink-0 items-center self-stretch focus-visible:outline-2 focus-visible:outline-offset-4";
  const ctaShellOutline = "focus-visible:outline-white";

  function handleNavFocusIn(e: FocusEvent<HTMLElement>) {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    const link = t.closest("a");
    if (!link || !navRef.current?.contains(link)) return;
    if (link.hasAttribute("data-brand-logo") || link.hasAttribute("data-cta")) {
      clearLine();
      return;
    }
    if (link.closest("[data-mega-panel]")) {
      clearLine();
      return;
    }
    syncLine(link);
  }

  function handleNavFocusOut(e: FocusEvent<HTMLElement>) {
    const next = e.relatedTarget;
    if (!(next instanceof Node) || !e.currentTarget.contains(next)) {
      clearLine();
    }
  }

  return (
    <>
      {mounted && backdropMounted
        ? createPortal(
            <div
              role="presentation"
              aria-hidden
              className={`fixed inset-x-0 top-20 bottom-0 z-40 cursor-default bg-custom-black/40 backdrop-blur-md transition-opacity duration-300 ease-out ${backdropFadeIn ? "opacity-100" : "opacity-0"}`}
              onClick={() => setOpenMegaMenu(null)}
            />,
            document.body,
          )
        : null}
      <header className={`fixed inset-x-0 top-0 z-50 overflow-visible ${headerSurface}`}>
        <nav
          ref={navRef}
          className={`relative flex h-20 items-stretch gap-10 overflow-visible ${pageInset}`}
          onMouseLeave={clearLine}
          onFocusCapture={handleNavFocusIn}
          onBlurCapture={handleNavFocusOut}
        >
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-[18px] z-10 h-px bg-custom-black transition-[left,width,opacity] duration-220 ease-[cubic-bezier(0.26,0.74,0.44,1.24)]"
          style={{
            left: line.left,
            width: line.width,
            opacity: line.active ? 1 : 0,
          }}
        />
        <a
          href="/"
          className={`${logoClass} flex shrink-0 items-center self-stretch`}
          data-brand-logo
          onMouseEnter={clearLine}
        >
          DPD Framework
        </a>
        <div
          className={navRowClass}
          onMouseEnter={() => setMenuHover(true)}
          onMouseLeave={() => setMenuHover(false)}
          onFocusCapture={() => setMenuHover(true)}
          onBlurCapture={(e) => {
            const next = e.relatedTarget;
            if (!(next instanceof Node) || !e.currentTarget.contains(next)) {
              setMenuHover(false);
            }
          }}
        >
          <div
            data-mega-nav-group
            className="inline-flex items-stretch gap-9 self-stretch"
            onMouseLeave={handleMegaNavGroupMouseLeave}
            onBlurCapture={handleMegaNavGroupBlurCapture}
          >
            <MegaMenuNavItem
              triggerLabel="Platform"
              triggerHref="/framework"
              triggerRef={megaMenuLeftRef}
              links={platformMegaLinks}
              panelId="site-header-platform-menu"
              ariaLabel="Platform menu"
              navLinkClass={navLinkClass}
              navRef={navRef}
              megaLeftRef={megaMenuLeftRef}
              ctaRef={ctaNavRef}
              open={openMegaMenu === "platform"}
              onActivate={() => setOpenMegaMenu("platform")}
              onDismiss={() => setOpenMegaMenu(null)}
              onLinkMouseEnter={(e) => syncLine(e.currentTarget)}
            />
            <MegaMenuNavItem
              triggerLabel="Products"
              triggerHref="/webinars"
              links={productsMegaLinks}
              panelId="site-header-products-menu"
              ariaLabel="Products menu"
              navLinkClass={navLinkClass}
              navRef={navRef}
              megaLeftRef={megaMenuLeftRef}
              ctaRef={ctaNavRef}
              open={openMegaMenu === "products"}
              onActivate={() => setOpenMegaMenu("products")}
              onDismiss={() => setOpenMegaMenu(null)}
              onLinkMouseEnter={(e) => syncLine(e.currentTarget)}
            />
            <MegaMenuNavItem
              triggerLabel="Company"
              triggerHref="#contact"
              links={companyMegaLinks}
              panelId="site-header-company-menu"
              ariaLabel="Company menu"
              navLinkClass={navLinkClass}
              navRef={navRef}
              megaLeftRef={megaMenuLeftRef}
              ctaRef={ctaNavRef}
              open={openMegaMenu === "company"}
              onActivate={() => setOpenMegaMenu("company")}
              onDismiss={() => setOpenMegaMenu(null)}
              onLinkMouseEnter={(e) => syncLine(e.currentTarget)}
            />
          </div>
        </div>
        <a
          ref={ctaNavRef}
          href="/survey"
          data-cta
          className={`${ctaShellClass} ${ctaShellOutline}`}
          onMouseEnter={clearLine}
        >
          <span className={ctaPillClass}>Take DPD Survey</span>
        </a>
        </nav>
      </header>
    </>
  );
}
