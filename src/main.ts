import { injectNavigationButtons } from "./inject-navigation-buttons";
import "./styles.css";

// --- Debounce utility ---
function debounce(fn: () => void, ms: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(fn, ms);
  };
}

// --- Debounced injection (300ms settles streaming tokens) ---
const debouncedInject = debounce(injectNavigationButtons, 300);

// --- Initial injection ---
injectNavigationButtons();

// --- Observe DOM changes (ChatGPT streams tokens, adds messages, etc.) ---
function startObserver() {
  const main = document.querySelector("main");
  if (!main) {
    // main hasn't loaded yet — retry shortly
    setTimeout(startObserver, 500);
    return;
  }

  const observer = new MutationObserver(debouncedInject);
  observer.observe(main, { childList: true, subtree: true });
}
startObserver();

// --- Detect SPA navigation (ChatGPT changes URL without page reload) ---
let lastUrl = location.href;
const urlObserver = new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    // Small delay to let the new chat DOM render
    setTimeout(injectNavigationButtons, 500);
  }
});
urlObserver.observe(document.body, { childList: true, subtree: false });
