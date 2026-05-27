import {
  scrollObserver,
  resetActiveBtn,
  setNavBtn,
  clearNavBtns,
} from "./scroll-observer";
import { createBtn } from "./createBtn";

const observedElements = new WeakSet<Element>();

export function injectNavigationButtons() {
  const presentationContainer = document.querySelector('div[role="presentation"]');
  if (!presentationContainer) return;

  const messageSections = presentationContainer.querySelectorAll<HTMLElement>("section[data-turn-id]");
  if (messageSections.length === 0) {
    const existingContainer = document.getElementById("navigate-btn-container");
    if (existingContainer) existingContainer.remove();
    return;
  }

  let btnContainer = document.getElementById("navigate-btn-container");
  if (!btnContainer) {
    btnContainer = document.createElement("div");
    btnContainer.id = "navigate-btn-container";
    document.body.appendChild(btnContainer);
  }

  const existingButtons = btnContainer.querySelectorAll<HTMLButtonElement>(
    "button[data-turn-id]",
  );

  const currentTurnIds: string[] = [];
  for (let i = 0; i < messageSections.length; i++) {
    currentTurnIds.push(messageSections[i].getAttribute("data-turn-id") || "");
  }

  if (existingButtons.length === currentTurnIds.length) {
    let isIdentical = true;
    for (let i = 0; i < currentTurnIds.length; i++) {
      if (
        (existingButtons[i].getAttribute("data-turn-id") || "") !== currentTurnIds[i]
      ) {
        isIdentical = false;
        break;
      }
    }
    if (isIdentical) return;
  }

  resetActiveBtn();
  btnContainer.innerHTML = "";
  clearNavBtns();

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < messageSections.length; i++) {
    const section = messageSections[i];
    section.dataset.navIndex = String(i);

    if (!observedElements.has(section)) {
      scrollObserver.observe(section);
      observedElements.add(section);
    }

    const btn = createBtn(section);
    setNavBtn(String(i), btn);
    fragment.appendChild(btn);
  }

  btnContainer.appendChild(fragment);
}
