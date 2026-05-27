import { scrollObserver, resetActiveBtn } from "./scroll-observer";
import { createBtn } from "./createBtn";

const observedElements = new WeakSet<Element>();

export function injectNavigationButtons() {
  const parent = document.querySelector('div[role="presentation"]');
  if (!parent) return;

  const chatArray = parent.querySelectorAll<HTMLElement>("section[data-turn-id]");
  if (chatArray.length === 0) {
    const old = document.getElementById("navigate-btn-container");
    if (old) old.remove();
    return;
  }

  let btnContainer = document.getElementById("navigate-btn-container");
  if (!btnContainer) {
    btnContainer = document.createElement("div");
    btnContainer.id = "navigate-btn-container";
    document.body.appendChild(btnContainer);
  }

  const existingBtns = btnContainer.querySelectorAll<HTMLButtonElement>(
    "button[data-turn-id]",
  );

  const wantedIds: string[] = [];
  for (let i = 0; i < chatArray.length; i++) {
    wantedIds.push(chatArray[i].getAttribute("data-turn-id") || "");
  }

  if (existingBtns.length === wantedIds.length) {
    let same = true;
    for (let i = 0; i < wantedIds.length; i++) {
      if (
        (existingBtns[i].getAttribute("data-turn-id") || "") !== wantedIds[i]
      ) {
        same = false;
        break;
      }
    }
    if (same) return;
  }

  resetActiveBtn();
  btnContainer.innerHTML = "";

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < chatArray.length; i++) {
    const chat = chatArray[i];
    chat.dataset.navIndex = String(i);

    if (!observedElements.has(chat)) {
      scrollObserver.observe(chat);
      observedElements.add(chat);
    }

    const btn = createBtn(chat, i);
    fragment.appendChild(btn);
  }

  btnContainer.appendChild(fragment);
}
