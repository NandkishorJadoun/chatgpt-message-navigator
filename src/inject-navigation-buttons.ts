import { scrollObserver } from "./scroll-observer";

export function injectNavigationButtons() {
  const parent = document.querySelector('div[role="presentation"]');

  if (!parent) return;

  const chatArray = parent.querySelectorAll("article");
  const msgContainer = parent.firstElementChild;

  if (!msgContainer || chatArray.length === 0) return;

  let btnContainer = document.querySelector("#navigate-btn-container");
  if (!btnContainer) {
    btnContainer = document.createElement("div");
    btnContainer.id = "navigate-btn-container";
    msgContainer.append(btnContainer);
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
    line.style.width = chat.dataset.turn === "user" ? "40%" : "70%";

    btn.appendChild(line);
    btn.style.setProperty("--msg-preview", `"${text}"`);

    btn.onclick = () => {
      chat.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    btnContainer.appendChild(btn);
  });
}
