/** Match the site's 500ms text fade, 16px rise, and 100ms stagger. */
export function initializeFrictionReveal(root: HTMLElement) {
  const cards = Array.from(root.querySelectorAll<HTMLElement>(".friction .fcard"));
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  const animations: Animation[] = [];
  const textItems = (card: HTMLElement) => Array.from(card.querySelectorAll<HTMLElement>(".ftag, h3, dt, dd"));
  cards.forEach(card => textItems(card).forEach(item => { item.style.opacity = "0"; }));
  const observer = new IntersectionObserver(entries => {
    if (root.closest("[inert]")) return;
    entries.forEach(entry => {
      const card = entry.target as HTMLElement;
      if (!entry.isIntersecting || card.dataset.textRevealed) return;
      card.dataset.textRevealed = "true";
      observer.unobserve(card);
      textItems(card).forEach((item, index) => {
        item.style.opacity = "";
        animations.push(item.animate([
          { opacity: 0, transform: "translateY(16px)" },
          { opacity: 1, transform: "translateY(0)" },
        ], { duration: 500, delay: index * 100, easing: "ease-out", fill: "backwards" }));
      });
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  cards.forEach(card => observer.observe(card));
  const gateObserver = new MutationObserver(() => {
    if (root.closest("[inert]")) return;
    cards.filter(card => !card.dataset.textRevealed).forEach(card => { observer.unobserve(card); observer.observe(card); });
  });
  gateObserver.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["inert"] });
  return () => {
    observer.disconnect();
    gateObserver.disconnect();
    animations.forEach(animation => animation.cancel());
    cards.forEach(card => textItems(card).forEach(item => { item.style.opacity = ""; }));
  };
}
