# ChatGPT Message Navigator

A lightweight client-side tool that injects a compact set of navigation buttons into the ChatGPT conversation UI so you can quickly preview and jump to messages in a conversation.

The extension adds a small, pill-style toolbar to the bottom of the ChatGPT thread. Each tiny button corresponds to a message in the thread, shows a preview on hover, and scrolls the conversation to the corresponding message on click. The currently visible message is highlighted in the toolbar.

---

## Features

- Compact navigation bar placed at the bottom of the thread
- Hover preview tooltip for message preview
- Click to smoothly scroll to a specific message
- Visual indicator for the currently visible message
- Easy to build and inject into ChatGPT as a content script

---

## How to Use

### 1. Prerequisites

- Node.js
- npm, yarn, or pnpm
- A browser with access to ChatGPT  
  <https://chatgpt.com>

### 2. Install and Build Locally

Clone the repository:

```bash
git clone https://github.com/NandkishorJadoun/chatgpt-message-navigator.git
cd chatgpt-message-navigator
```

- Install dependencies:

```bash
npm install
  # or
yarn
  # or
pnpm install
```

- Build with Vite:

```bash
npm run build
```

- The build will produce `dist/main.js` (and other assets) per vite.config.ts.

### 3. Quick way to inject into ChatGPT

- You can load the built script into ChatGPT by using Developer mode in `chrome://extensions/` and load the extension (unpacked) into Chrome/Edge/Firefox and open ChatGPT.

### 4. Using the toolbar inside ChatGPT

- After the script is loaded, a rounded navigation bar appears near the bottom of the thread container.
- Each tiny vertical button represents a message.
- Hover a button to see a short preview tooltip.
- Click a button to smoothly scroll to that message.
- The button for the message currently visible in the viewport will be highlighted.

---

## How it works (high level)

- src/main.ts initializes the injector and attaches a MutationObserver to keep navigation buttons in sync with dynamic changes.
- src/inject-navigation-buttons.ts finds all conversation articles, builds the navigation buttons, and wires click/hover behavior.
- src/scroll-observer.ts uses an IntersectionObserver to mark which message is currently in view and toggles the active button.
- src/styles.css contains styling for the toolbar, buttons, and hover previews.
- vite.config.ts defines a simple Vite build that outputs `dist/main.js`.

---

## Contributing

- Bug reports, suggestions, and PRs are welcome — please open an issue or submit a pull request.
- Keep changes small and focused. If you propose a behavior change (e.g., different button layout), please include screenshots or short GIFs showing the new behaviour.

---

## Acknowledgements

- Built by Nandkishor Jadoun.

---

## Contact

- For questions or feedback open an issue or create a PR on the repository.
