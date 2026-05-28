import { injectNavigationButtons } from "./inject-navigation-buttons";
import { enhanceSidebar } from "./quick-delete-chat";
import "./styles.css";

function debounce(fn: () => void, ms: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(fn, ms);
  };
}

const debouncedNavigation = debounce(injectNavigationButtons, 300);

function tryInject() {
  if (document.querySelector('div[role="presentation"]')) {
    injectNavigationButtons();
  } else {
    setTimeout(tryInject, 500);
  }
}
tryInject();

function startObserver() {
  const main = document.querySelector("main");
  if (!main) {
    setTimeout(startObserver, 500);
    return;
  }
  const observer = new MutationObserver(debouncedNavigation);
  observer.observe(main, { childList: true, subtree: true });
}
startObserver();

function tryInjectSidebar() {
  if (document.querySelector('[aria-label="Chat history"]')) {
    enhanceSidebar();
  } else {
    setTimeout(tryInjectSidebar, 500);
  }
}
tryInjectSidebar();

let previousUrl = location.href;
const urlChangeObserver = new MutationObserver(() => {
  if (location.href !== previousUrl) {
    previousUrl = location.href;
    setTimeout(() => {
      injectNavigationButtons();
      enhanceSidebar();
    }, 500);
  }
});

urlChangeObserver.observe(document.body, { childList: true, subtree: true });
