import { injectNavigationButtons } from "./inject-navigation-buttons";
import "./styles.css";

function debounce(fn: () => void, ms: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(fn, ms);
  };
}

const debouncedInject = debounce(injectNavigationButtons, 300);

// Wait for React hydration, then inject
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
  const observer = new MutationObserver(debouncedInject);
  observer.observe(main, { childList: true, subtree: true });
}
startObserver();

let lastUrl = location.href;
const urlObserver = new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    setTimeout(injectNavigationButtons, 500);
  }
});
urlObserver.observe(document.body, { childList: true, subtree: false });
