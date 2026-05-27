let activeBtn: Element | null = null;
const navButtonMap = new Map<string, Element>();

export function setNavBtn(index: string, btn: Element) {
  navButtonMap.set(index, btn);
}

export function clearNavBtns() {
  navButtonMap.clear();
}

export const scrollObserver = new IntersectionObserver(
  (entries) => {
    let topmostEntry: IntersectionObserverEntry | null = null;

    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      if (!(entry.target as HTMLElement).dataset.navIndex) continue;
      if (!topmostEntry || entry.boundingClientRect.top < topmostEntry.boundingClientRect.top) {
        topmostEntry = entry;
      }
    }

    if (!topmostEntry) return;

    const index = (topmostEntry.target as HTMLElement).dataset.navIndex!;
    const targetButton = navButtonMap.get(index);
    if (!targetButton || targetButton === activeBtn) return;

    if (activeBtn) activeBtn.classList.remove("active-nav");
    targetButton.classList.add("active-nav");
    activeBtn = targetButton;
  },
  {
    threshold: 0.1,
    rootMargin: "-20% 0px -20% 0px",
  },
);

export function resetActiveBtn() {
  activeBtn = null;
}
