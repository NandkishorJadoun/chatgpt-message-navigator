const scrollObserver = new IntersectionObserver(
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

function injectNavigationButtons() {
  const chatArray = document.querySelectorAll("article");
  const threadBottomContainer = document.querySelector(
    "#thread-bottom-container",
  );

  if (!threadBottomContainer || chatArray.length === 0) return;

  let btnContainer = document.querySelector("#navigate-btn-container");
  if (!btnContainer) {
    btnContainer = document.createElement("div");
    btnContainer.id = "navigate-btn-container";
    threadBottomContainer.prepend(btnContainer);
  }

  const existingButtons = btnContainer.querySelectorAll("button");
  if (existingButtons.length === chatArray.length) return;

  btnContainer.innerHTML = "";

  chatArray.forEach((chat) => {
    scrollObserver.observe(chat);

    const text = chat.textContent.replace(/\s+/g, " ").trim().substring(0, 150);

    const btn = document.createElement("button");
    btn.classList.add("nav-btn");

    const line = document.createElement("div");
    line.id = "msg-line";
    line.style.height = chat.dataset.turn === "user" ? "30%" : "60%";

    btn.appendChild(line);
    btn.style.setProperty("--msg-preview", `"${text}"`);

    btn.onclick = () => {
      chat.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    btnContainer.appendChild(btn);
  });
}

injectNavigationButtons();

const observer = new MutationObserver(() => {
  injectNavigationButtons();
});

observer.observe(document.querySelector("main")!, {
  childList: true,
  subtree: true,
});
