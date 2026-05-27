# ChatGPT Message Navigator

A tiny extension that adds a navigation bar to ChatGPT so you can quickly jump between messages in long conversations. Hover a dot to see a preview, click to scroll there.

## Features

- Navigation bar sits on the right side of the screen
- Hover any dot to see a preview of that message
- Click a dot to scroll straight to that message
- The dot for the message you're currently looking at is highlighted
- Works with ChatGPT's dynamic updates — new messages appear automatically

## Setup

### 1. Prerequisites

- Node.js
- npm, yarn, or pnpm
- A browser with ChatGPT open at <https://chatgpt.com>

### 2. Build it

```bash
git clone https://github.com/NandkishorJadoun/chatgpt-message-navigator.git
cd chatgpt-message-navigator
pnpm install    # or npm install / yarn
pnpm run build  # outputs dist/
```

### 3. Load it into your browser

1. Go to `chrome://extensions/`
2. Turn on **Developer mode** (top right)
3. Click **Load unpacked**
4. Pick the `dist/` folder

Now open or refresh ChatGPT — the nav bar appears on the right side.

### 4. Using it

- A row of thin vertical dots appears on the right edge of the page
- Hover a dot → a tooltip shows the first ~150 characters of that message
- Click a dot → the page scrolls to that message
- The dot for whatever message is currently on screen gets highlighted

## What's changed recently

- **Scroll perf**: The intersection observer no longer queries the DOM on every scroll event — it uses an in-memory map instead
- **Multiple entries**: When scrolling fast, the observer now picks the topmost intersecting message instead of cycling through all of them
- **Cleanup**: Removed unused code and renamed variables to make the source easier to follow
- **Dist ignored**: The `dist/` folder is now gitignored

## How it works (quick overview)

- `src/main.ts` — entry point. Watches for DOM changes and URL changes so the nav bar stays in sync
- `src/inject-navigation-buttons.ts` — finds all chat messages and builds the navigation dots
- `src/scroll-observer.ts` — uses IntersectionObserver to track which message is visible and highlights the matching dot
- `src/createBtn.ts` — creates each dot button with hover preview and click scrolling
- `src/styles.css` — all the styling for the nav bar and tooltips

## Donate

If this extension saved you time, consider buying me a coffee:

**[buymeacoffee.com/yourusername](https://buymeacoffee.com/yourusername)** *(replace with your real link)*

## Contributing

Bug reports, ideas, and PRs are welcome. Open an issue or send a pull request. If you're changing how something looks, a screenshot or GIF helps a lot.

## License

MIT

## Contact

Open an issue or PR on [GitHub](https://github.com/NandkishorJadoun/chatgpt-message-navigator).
