import { scrollObserver, resetActiveBtn } from "./scroll-observer";
import { createBtn } from "./createBtn";

const observedElements = new WeakSet<Element>();

export function injectNavigationButtons() {
  const parent = document.querySelector('div[role="presentation"]');
  if (!parent) return;

  const msgContainer = parent.firstElementChild;
  const chatArray = parent.querySelectorAll<HTMLElement>(
    'div[data-message-author-role="user"]',
  );

  if (!msgContainer || chatArray.length === 0) {
    // Chat cleared or navigated away — clean up
    const old = document.getElementById("navigate-btn-container");
    if (old) old.remove();
    return;
  }

  let btnContainer = document.getElementById("navigate-btn-container");
  if (!btnContainer) {
    btnContainer = document.createElement("div");
    btnContainer.id = "navigate-btn-container";
    msgContainer.append(btnContainer);
  }

  // Build a map of what we want: index → turnId
  const wantedIds: string[] = [];
  for (let i = 0; i < chatArray.length; i++) {
    wantedIds.push(chatArray[i].getAttribute("data-message-id") || "");
  }

  // Build a map of what we have: turnId → button element
  const existingBtns = btnContainer.querySelectorAll<HTMLButtonElement>(
    "button[data-turn-id]",
  );
  const existingMap = new Map<string, HTMLButtonElement>();
  for (const btn of existingBtns) {
    existingMap.set(btn.getAttribute("data-turn-id") || "", btn);
  }

  // Quick equality check — if all IDs match in order, skip the work
  if (existingBtns.length === wantedIds.length) {
    let same = true;
    for (let i = 0; i < wantedIds.length; i++) {
      if ((existingBtns[i].getAttribute("data-turn-id") || "") !== wantedIds[i]) {
        same = false;
        break;
      }
    }
    if (same) return;
  }

  // Full rebuild only when the set of messages changed
  // (This is still much cheaper than before because we only reach here
  //  when hasChatStateChanged is true, and we do it at most once per debounce window)
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
