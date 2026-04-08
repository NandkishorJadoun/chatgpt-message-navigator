let activeBtn: Element | null = null;

export const scrollObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;

      const target = entry.target as HTMLElement;
      const index = target.dataset.navIndex;
      if (index == null) continue;

      const container = document.getElementById("navigate-btn-container");
      if (!container) continue;

      const nextBtn = container.querySelector(`[data-nav-index="${index}"]`);
      if (!nextBtn || nextBtn === activeBtn) continue;

      if (activeBtn) activeBtn.classList.remove("active-nav");
      nextBtn.classList.add("active-nav");
      activeBtn = nextBtn;
    }
  },
  {
    threshold: 0.1,
    rootMargin: "-20% 0px -20% 0px",
  },
);

export function resetActiveBtn() {
  activeBtn = null;
}
