/** Use the same 500ms fade, 16px rise, and 100ms stagger as the other site pages. */
export function initializeTextReveal(root: HTMLElement) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  const selectors = [
    ".section-heading",
    ".posture-summary-copy",
    ".posture-details > h2",
    ".deep > .eyebrow",
    ".deep > .dlabel",
    ".deep dl > div",
    ".coverage > .eyebrow",
    ".impacts > .impact",
    ".impacts > .ask",
    ".wrap > section > h2",
    ".wrap > section > .lede",
    ".why-card",
    ".why-use",
    ".cta-copy",
  ].join(",");
  const targets = Array.from(root.querySelectorAll<HTMLElement>(selectors));
  const revealed = new Set<Element>();
  const animations: Animation[] = [];
  targets.forEach(target => { target.style.opacity = "0"; });
  const observer = new IntersectionObserver(entries => {
    if (root.closest("[inert]")) return;
    let stagger = 0;
    entries.forEach(entry => {
      const target = entry.target as HTMLElement;
      if (!entry.isIntersecting || revealed.has(target)) return;
      revealed.add(target);
      observer.unobserve(target);
      target.style.opacity = "";
      animations.push(target.animate([
        { opacity: 0, transform: "translateY(16px)" },
        { opacity: 1, transform: "translateY(0)" },
      ], { duration: 500, delay: stagger++ * 100, easing: "ease-out", fill: "backwards" }));
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  targets.forEach(target => observer.observe(target));
  const gateObserver = new MutationObserver(() => {
    if (root.closest("[inert]")) return;
    targets.filter(target => !revealed.has(target)).forEach(target => { observer.unobserve(target); observer.observe(target); });
  });
  gateObserver.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["inert"] });
  return () => {
    observer.disconnect();
    gateObserver.disconnect();
    animations.forEach(animation => animation.cancel());
    targets.forEach(target => { target.style.opacity = ""; });
  };
}
