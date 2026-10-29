export function initializeMeetingTimeline(root: HTMLElement) {
  const section = root.querySelector<HTMLElement>('section[aria-labelledby="mo-h"]');
  if (!section) return () => {};
  const tabs = Array.from(section.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const panels = Array.from(section.querySelectorAll<HTMLElement>('[role="tabpanel"]'));
  tabs.forEach(tab => {
    const ring = document.createElement("span");
    ring.className = "timeline-number-border";
    ring.setAttribute("aria-hidden", "true");
    ring.innerHTML = '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="23" pathLength="100" /></svg>';
    tab.querySelector(".timeline-number")?.appendChild(ring);
  });
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let active = 0;
  let interacted = false;
  let visible = false;
  let animation: Animation | undefined;
  let outgoingAnimation: Animation | undefined;
  let stepAnimation: Animation | undefined;
  let elapsed = 0;
  let selectionAnimating = false;
  let lastTime: number | undefined;
  const timeline = section.querySelector<HTMLElement>(".meeting-timeline")!;
  const progress = document.createElement("span");
  progress.className = "meeting-timeline-progress";
  progress.setAttribute("aria-hidden", "true");
  timeline.prepend(progress);
  const paintProgress = (fraction = 0) => {
    const track = timeline.getBoundingClientRect();
    const first = tabs[0].querySelector(".timeline-number")!.getBoundingClientRect();
    const last = tabs[tabs.length - 1].querySelector(".timeline-number")!.getBoundingClientRect();
    const circle = tabs[active].querySelector(".timeline-number")!.getBoundingClientRect();
    const start = first.left + first.width / 2;
    const end = last.left + last.width / 2;
    let target = circle.left + circle.width / 2;
    if (!selectionAnimating && active < tabs.length - 1) {
      const next = tabs[active + 1].querySelector(".timeline-number")!.getBoundingClientRect();
      // Time only the visible gap, not the hidden distance underneath a circle.
      const from = circle.right + 2;
      const to = next.left - 2;
      target = from + (to - from) * fraction;
    }
    progress.style.left = `${start - track.left}px`;
    progress.style.width = `${end - start}px`;
    progress.style.transform = `scaleX(${Math.max(0, Math.min(1, (target - start) / (end - start)))})`;
  };
  const select = (index: number, focus = false) => {
    const previous = active;
    animation?.cancel();
    outgoingAnimation?.cancel();
    active = index;
    elapsed = 0;
    paintProgress();
    tabs.forEach((tab, i) => {
      tab.setAttribute("aria-selected", String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
      panels[i].inert = i !== index;
      panels[i].setAttribute("aria-hidden", String(i !== index));
    });
    stepAnimation?.cancel();
    selectionAnimating = false;
    if (!reducedMotion.matches) {
      const border = tabs[index].querySelector<SVGCircleElement>(".timeline-number-border circle");
      stepAnimation = border?.animate([
        { strokeDashoffset: "100" },
        { strokeDashoffset: "0" },
      ], { duration: 650, easing: "linear" });
      if (stepAnimation) {
        selectionAnimating = true;
        paintProgress();
        const currentAnimation = stepAnimation;
        currentAnimation.finished.then(() => {
          if (stepAnimation === currentAnimation) selectionAnimating = false;
        }).catch(() => {});
      }
    }
    if (focus) tabs[index].focus();
    if (!reducedMotion.matches && previous !== index) {
      const outgoing = panels[previous];
      outgoing.hidden = false;
      outgoing.inert = true;
      outgoing.setAttribute("aria-hidden", "true");
      const incomingBounds = panels[index].getBoundingClientRect();
      const outgoingBounds = outgoing.getBoundingClientRect();
      const enterDistance = window.innerWidth - incomingBounds.left + 24;
      const exitDistance = outgoingBounds.right + 24;
      const timing = { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)" };
      outgoingAnimation = outgoing.animate(
        [{ transform: "translateX(0)" }, { transform: `translateX(-${exitDistance}px)` }], timing,
      );
      animation = panels[index].animate(
        [{ transform: `translateX(${enterDistance}px)` }, { transform: "translateX(0)" }], timing,
      );
      outgoingAnimation.finished.then(() => {
        if (active !== previous) outgoing.hidden = true;
      }).catch(() => {});
    }
  };
  const stop = () => { interacted = true; paintProgress(); };
  const click = (event: Event) => {
    const tab = (event.target as HTMLElement).closest<HTMLButtonElement>('[role="tab"]');
    if (tab && tabs.includes(tab)) select(tabs.indexOf(tab));
  };
  const keydown = (event: KeyboardEvent) => {
    stop();
    const tab = (event.target as HTMLElement).closest<HTMLButtonElement>('[role="tab"]');
    if (!tab) return;
    const index = tabs.indexOf(tab);
    let next: number;
    if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else if (["ArrowRight", "ArrowDown"].includes(event.key)) next = (index + 1) % tabs.length;
    else if (["ArrowLeft", "ArrowUp"].includes(event.key)) next = (index - 1 + tabs.length) % tabs.length;
    else return;
    event.preventDefault();
    select(next, true);
  };
  section.addEventListener("pointerdown", stop);
  section.addEventListener("focusin", stop);
  section.addEventListener("click", click);
  section.addEventListener("keydown", keydown);
  const observer = new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting);
  }, { threshold: 0.15 });
  observer.observe(section);
  let frame = 0;
  const tick = (time: number) => {
    const delta = lastTime === undefined ? 0 : time - lastTime;
    lastTime = time;
    if (!interacted && !selectionAnimating && visible && !document.hidden && !root.closest("[inert]") && !reducedMotion.matches) {
      elapsed += delta;
      if (elapsed >= 5000) select((active + 1) % tabs.length);
      paintProgress(elapsed / 5000);
    }
    frame = window.requestAnimationFrame(tick);
  };
  paintProgress();
  frame = window.requestAnimationFrame(tick);
  return () => {
    observer.disconnect();
    window.cancelAnimationFrame(frame);
    progress.remove();
    tabs.forEach(tab => tab.querySelector(".timeline-number-border")?.remove());
    animation?.cancel();
    outgoingAnimation?.cancel();
    stepAnimation?.cancel();
    section.removeEventListener("pointerdown", stop);
    section.removeEventListener("focusin", stop);
    section.removeEventListener("click", click);
    section.removeEventListener("keydown", keydown);
  };
}
