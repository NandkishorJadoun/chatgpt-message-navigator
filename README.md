# AI Chat Manager

A tiny extension that adds a navigation bar and quick-delete buttons to ChatGPT so you can quickly jump between messages and clean up your chat list. Future versions will also support Claude and Gemini.

## Features

- Navigation bar sits on the right side of the screen
- Hover any button to see a preview of that message
- Click a button to scroll straight to that message
- The button for the message you're currently looking at is highlighted
- **Quick delete button** to remove the chats in the sidebar.
- **Light mode support**: tooltips and navigation lines automatically adapt to your theme

## Setup

### 1. Prerequisites

- Node.js
- pnpm
- A browser with ChatGPT open at <https://chatgpt.com>

### 2. Build it

```bash
git clone https://github.com/NandkishorJadoun/ai-chat-manager.git
cd ai-chat-manager
pnpm install
pnpm run build
```

### 3. Load it into your browser

1. Go to `chrome://extensions/`
2. Turn on **Developer mode** (top right)
3. Click **Load unpacked**
4. Pick the `dist/` folder

Now open or refresh ChatGPT, you'll see the nav bar appears on the right side.

### 4. Using it

- A row of thin vertical lines appears on the right edge of the page
- Hover a line to see a tooltip with the first ~150 characters of that message
- Click a line to scroll straight to that message
- The line for whatever message is currently on screen is highlighted

## What's changed recently

- **Quick delete**: All chats in the sidebar have a X button now, click it to permanently remove chats — no confirmation dialog
- **Light mode**: The tooltip and nav bar now respect `prefers-color-scheme` — white background with dark text in light mode
- **Scroll perf**: The intersection observer no longer queries the DOM on every scroll event — it uses an in-memory map instead
- **Multiple entries**: When scrolling fast, the observer now picks the topmost intersecting message instead of cycling through all of them
- **Cleanup**: Removed unused code and renamed variables to make the source easier to follow
- **Dist ignored**: The `dist/` folder is now gitignored

## Roadmap

- **Claude support** — manage Anthropic Claude conversations
- **Gemini support** — manage Google Gemini conversations

The goal is to be a universal AI chat manager that works across all major platforms.

## Donate

If this extension saved you time, consider buying me a coffee:

**[buymeacoffee.com/nandkishorjadoun](https://buymeacoffee.com/nandkishorjadoun)**

## Contributing

Bug reports, ideas, and PRs are welcome. Open an issue or send a pull request. If you're changing how something looks, a screenshot or GIF helps a lot.

## Contact

Open an issue or PR on [GitHub](https://github.com/NandkishorJadoun/ai-chat-manager).
