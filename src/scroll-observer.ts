export const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const articles = Array.from(document.querySelectorAll("article"));
        const index = articles.indexOf(entry.target as HTMLElement);

        document
          .querySelectorAll(".nav-btn")
          .forEach((btn) => btn.classList.remove("active-nav"));

        const activeBtn = document.querySelectorAll(".nav-btn")[index];
        if (activeBtn) activeBtn.classList.add("active-nav");
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "-20% 0px -20% 0px",
  },
);
