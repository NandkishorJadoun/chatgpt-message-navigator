import { injectNavigationButtons } from "./inject-navigation-buttons";
import "./styles.css";

injectNavigationButtons();

const main = document.querySelector("main")!;

const observer = new MutationObserver(() => {
  observer.disconnect(); // prevent self-trigger
  injectNavigationButtons();
  observer.observe(main, { childList: true, subtree: true });
});

observer.observe(main, { childList: true, subtree: true });
