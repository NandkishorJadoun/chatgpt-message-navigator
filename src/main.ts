import { injectNavigationButtons } from "./inject-navigation-buttons";
import { enhanceSidebar } from "./quick-delete-chat";
import "./styles.css";

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
  const observer = new MutationObserver(() => injectNavigationButtons());
  observer.observe(main, { childList: true, subtree: true });
}

startObserver();
enhanceSidebar();

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
