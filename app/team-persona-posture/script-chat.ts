export function initializeScriptChat(root: HTMLElement) {
  const section = root.querySelector<HTMLElement>('section[aria-labelledby="sc-h"]');
  const chat = section?.querySelector<HTMLElement>(".script");
  if (!section || !chat || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  const messages = Array.from(chat.querySelectorAll<HTMLElement>(".script-message:not([hidden])"));
  const indicator = document.createElement("li");
  indicator.className = "script-typing";
  indicator.setAttribute("aria-hidden", "true");
  indicator.innerHTML = '<span class="typing-dots"><i></i><i></i><i></i></span><span>Manager is typing…</span>';
  chat.appendChild(indicator);
  // Reserve the final height so revealing messages does not move nearby sections.
  const fullHeight = chat.getBoundingClientRect().height;
  chat.style.minHeight = `${fullHeight}px`;
  messages.forEach(message => { message.style.display = "none"; });
  indicator.style.display = "none";
  let started = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let index = 0;
  const animations: Animation[] = [];
  const revealNext = () => {
    indicator.style.display = "flex";
    const message = messages[index];
    const delay = index === 0 ? 700 : Math.min(1800, 650 + (message.textContent?.length || 0) * 4);
    timer = setTimeout(() => {
      message.style.display = "";
      animations.push(message.animate(
        [{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 350, easing: "ease-out" },
      ));
      index++;
      if (index < messages.length) revealNext();
      else indicator.remove();
    }, delay);
  };
  const start = () => {
    if (started || root.closest("[inert]")) return;
    const bounds = section.getBoundingClientRect();
    if (bounds.top >= window.innerHeight || bounds.bottom <= 0) return;
    started = true;
    observer.disconnect();
    if (messages.length) revealNext();
    else indicator.remove();
  };
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) start();
  }, { threshold: 0.15 });
  observer.observe(section);
  const gateObserver = new MutationObserver(start);
  gateObserver.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["inert"] });
  return () => {
    observer.disconnect();
    gateObserver.disconnect();
    if (timer) clearTimeout(timer);
    animations.forEach(animation => animation.cancel());
    indicator.remove();
    chat.style.minHeight = "";
    messages.forEach(message => { message.style.display = ""; });
  };
}
