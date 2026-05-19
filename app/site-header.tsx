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

const DARK_SECTION_IDS = ["transformation"] as const;

/** Matches `h-20` on the nav row */
const HEADER_HEIGHT_PX = 80;

function headerOverlapsSection(section: HTMLElement): boolean {
  const rect = section.getBoundingClientRect();
  return rect.top < HEADER_HEIGHT_PX && rect.bottom > 0;
}

const navItems = [
  { label: "Take Survey", href: "/survey" },
  { label: "Company", href: "#contact" },
];

const companyMegaLinks = [
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

type LineState = { left: number; width: number; active: boolean };

const MEGA_MENU_TOP_GAP_PX = 8;
/** Narrow the panel on the right (px shorter than Take Survey → Try the app span). */
const MEGA_MENU_RIGHT_TRIM_PX = 120;

/** Matches `duration-300` on the company menu backdrop overlay */
const COMPANY_BACKDROP_FADE_MS = 300;

type MegaLayout = { left: number; width: number; top: number };

function CompanyNavItem({
  navLinkClass,
  onLinkMouseEnter,
  navRef,
  takeSurveyRef,
  ctaRef,
  open,
  onOpenChange,
}: {
  navLinkClass: string;
  onLinkMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  navRef: RefObject<HTMLElement | null>;
  takeSurveyRef: RefObject<HTMLAnchorElement | null>;
  ctaRef: RefObject<HTMLAnchorElement | null>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [mega, setMega] = useState<MegaLayout | null>(null);
  const [megaContentVisible, setMegaContentVisible] = useState(false);
  const panelId = "site-header-company-menu";

  const measureMega = useCallback(() => {
    const nav = navRef.current;
    const ts = takeSurveyRef.current;
    const cta = ctaRef.current;
    if (!nav || !ts || !cta) {
      setMega(null);
      return;
    }
    const navR = nav.getBoundingClientRect();
    const tsR = ts.getBoundingClientRect();
    const ctaR = cta.getBoundingClientRect();
    const width = ctaR.left - tsR.left - MEGA_MENU_RIGHT_TRIM_PX;
    if (width < 120) {
      setMega(null);
      return;
    }
    setMega({
      left: tsR.left,
      width,
      top: navR.bottom + MEGA_MENU_TOP_GAP_PX,
    });
  }, [navRef, takeSurveyRef, ctaRef]);

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
      if (e.key === "Escape") onOpenChange(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) {
      setMegaContentVisible(false);
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

  function handleBlurCapture(e: FocusEvent<HTMLDivElement>) {
    const next = e.relatedTarget;
    if (!(next instanceof Node) || !e.currentTarget.contains(next)) {
      onOpenChange(false);
    }
  }

  const megaContentFadeClass = `transition-opacity duration-300 ease-out ${
    megaContentVisible ? "opacity-100" : "opacity-0"
  }`;

  return (
    <div
      className="relative inline-flex self-stretch"
      onMouseEnter={() => onOpenChange(true)}
      onMouseLeave={() => onOpenChange(false)}
      onFocusCapture={() => onOpenChange(true)}
      onBlurCapture={handleBlurCapture}
    >
      <a
        href="#contact"
        className={navLinkClass}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="true"
        onMouseEnter={onLinkMouseEnter}
      >
        Company
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
            data-company-panel
            className="fixed z-70"
            style={{ left: mega.left, width: mega.width, top: mega.top }}
            role="region"
            aria-label="Company menu"
          >
            <div className="items-start overflow-hidden rounded-md bg-background shadow-[0_24px_80px_rgba(0,0,0,0.12)] md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
              <nav
                className={`flex flex-col divide-y divide-black/10 px-6 py-2 md:px-8 md:py-3 ${megaContentFadeClass}`}
              >
                {companyMegaLinks.map((row) => (
                  <a
                    key={row.label}
                    href={row.href}
                    className="group flex w-full items-center justify-start gap-2 py-5 text-lg font-medium tracking-tight text-[#111111] transition-colors first:pt-6 last:pb-6 hover:text-black/70 md:py-6 md:text-xl"
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
              </nav>
              <div className={`p-5 md:p-6 ${megaContentFadeClass}`}>
                <a
                  href="/about"
                  className="group/card block rounded-md outline-offset-2 focus-visible:outline-2 focus-visible:outline-black/80"
                >
                  <div className="relative h-40 w-full overflow-hidden rounded-md bg-black/5 md:h-48">
                    <Image
                      src="/scroll-cards/card-1.jpg"
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 420px"
                    />
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-black/55">
                    About DPDing
                  </p>
                  <p className="mt-1.5 text-base font-semibold leading-snug tracking-tight text-[#111111] md:text-lg">
                    Who we are, what we do, and why it matters
                  </p>
                </a>
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
  const [companyMenuOpen, setCompanyMenuOpen] = useState(false);
  const [backdropMounted, setBackdropMounted] = useState(false);
  const [backdropFadeIn, setBackdropFadeIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [line, setLine] = useState<LineState>({
    left: 0,
    width: 0,
    active: false,
  });

  const navRef = useRef<HTMLElement | null>(null);
  const takeSurveyNavRef = useRef<HTMLAnchorElement | null>(null);
  const ctaNavRef = useRef<HTMLAnchorElement | null>(null);
  const lineTargetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (companyMenuOpen) {
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
      COMPANY_BACKDROP_FADE_MS,
    );
    return () => window.clearTimeout(hideId);
  }, [companyMenuOpen]);

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
    ? "border-b border-black bg-background shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition-[border-color,box-shadow,background-color] duration-300 ease-out"
    : navOnDark
      ? "border-b border-gray-400/90 bg-transparent shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-[border-color,box-shadow,background-color] duration-300 ease-out"
      : "border-b border-black bg-background/45 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition-[border-color,box-shadow,background-color] duration-300 ease-out";

  const logoClass =
    navOnDark && !barSolid
      ? "text-xl font-extrabold tracking-[-0.04em] text-white transition-colors duration-300 ease-out"
      : "text-xl font-extrabold tracking-[-0.04em] text-black transition-colors duration-300 ease-out";

  const navRowClass =
    navOnDark && !barSolid
      ? "hidden items-stretch gap-9 pl-20 text-[0.63rem] font-black uppercase tracking-[0.22em] text-white transition-colors duration-300 ease-out md:flex"
      : "hidden items-stretch gap-9 pl-20 text-[0.63rem] font-black uppercase tracking-[0.22em] text-black transition-colors duration-300 ease-out md:flex";

  const navLinkClass =
    navOnDark && !barSolid
      ? "inline-flex items-center self-stretch transition-colors duration-300 ease-out hover:text-white/75"
      : "inline-flex items-center self-stretch transition-colors duration-300 ease-out hover:text-black/65";

  const ctaPillClass =
    navOnDark && !barSolid
      ? "inline-flex h-9 items-center justify-center rounded-full border border-white/70 bg-transparent px-7 text-base font-normal text-white transition-[color,border-color,background-color] duration-300 ease-out group-hover:border-white group-hover:bg-white group-hover:text-black group-focus-visible:border-white group-focus-visible:bg-white group-focus-visible:text-black"
      : "inline-flex h-9 items-center justify-center rounded-full border border-black bg-black px-7 text-base font-normal text-white opacity-100 transition-[opacity] duration-300 ease-out group-hover:opacity-50 group-focus-visible:opacity-50";

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
    if (link.closest("[data-company-panel]")) {
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
              className={`fixed inset-x-0 top-20 bottom-0 z-40 cursor-default bg-black/40 backdrop-blur-md transition-opacity duration-300 ease-out ${backdropFadeIn ? "opacity-100" : "opacity-0"}`}
              onClick={() => setCompanyMenuOpen(false)}
            />,
            document.body,
          )
        : null}
      <header className={`fixed inset-x-0 top-0 z-50 overflow-visible ${headerSurface}`}>
        <nav
          ref={navRef}
          className="relative mx-auto flex h-20 w-full items-stretch gap-10 overflow-visible px-7 sm:px-10 lg:px-14"
          onMouseLeave={clearLine}
          onFocusCapture={handleNavFocusIn}
          onBlurCapture={handleNavFocusOut}
        >
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-[18px] z-10 h-px bg-black transition-[left,width,opacity] duration-220 ease-[cubic-bezier(0.26,0.74,0.44,1.24)]"
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
          DPDing
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
          {navItems.map((item) =>
            item.label === "Company" ? (
              <CompanyNavItem
                key={item.label}
                navLinkClass={navLinkClass}
                navRef={navRef}
                takeSurveyRef={takeSurveyNavRef}
                ctaRef={ctaNavRef}
                open={companyMenuOpen}
                onOpenChange={setCompanyMenuOpen}
                onLinkMouseEnter={(e) => syncLine(e.currentTarget)}
              />
            ) : (
              <a
                key={item.label}
                ref={takeSurveyNavRef}
                href={item.href}
                className={navLinkClass}
                onMouseEnter={(e) => syncLine(e.currentTarget)}
              >
                {item.label}
              </a>
            ),
          )}
        </div>
        <a
          ref={ctaNavRef}
          href="#contact"
          data-cta
          className={`${ctaShellClass} ${ctaShellOutline}`}
          onMouseEnter={clearLine}
        >
          <span className={ctaPillClass}>Try the app</span>
        </a>
        </nav>
      </header>
    </>
  );
}
