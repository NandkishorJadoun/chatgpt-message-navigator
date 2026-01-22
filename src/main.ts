import { injectNavigationButtons } from "./inject-navigation-buttons";
import "./styles.css"

injectNavigationButtons();

const observer = new MutationObserver(() => {
  injectNavigationButtons();
});

observer.observe(document.querySelector("main")!, {
  childList: true,
  subtree: true,
});
