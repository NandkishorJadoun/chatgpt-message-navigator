import { scrollObserver } from "./scroll-observer";
import { createBtn } from "./createBtn";
import { hasChatStateChanged } from "./hasChatStateChanged";

export function injectNavigationButtons() {

  const parent = document.querySelector('div[role="presentation"]');
  if (!parent) return;

  const msgContainer = parent.firstElementChild;
  const chatArray = parent.querySelectorAll("article");
  if (!msgContainer || chatArray.length === 0) return;

  let btnContainer = msgContainer.querySelector("#navigate-btn-container");
  if (!btnContainer) {
    btnContainer = document.createElement("div");
    btnContainer.id = "navigate-btn-container";
    msgContainer.append(btnContainer);
  }

  const existingButtons = btnContainer.querySelectorAll("button");

  // rerender if state changed...
  if (!hasChatStateChanged(existingButtons, chatArray)) return;

  btnContainer.innerHTML = "";

  chatArray.forEach((chat) => {
    scrollObserver.observe(chat);
    const btn = createBtn(chat)
    btnContainer.appendChild(btn);
  });
}