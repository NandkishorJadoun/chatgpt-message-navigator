import { scrollObserver } from "./scroll-observer";

export function injectNavigationButtons() {
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
