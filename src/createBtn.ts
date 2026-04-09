const MAX_PREVIEW_LENGTH = 200;

export const createBtn = (messageEle: HTMLElement, index: number) => {
  const rawText = messageEle.textContent || "";
  const text =
    rawText.length > MAX_PREVIEW_LENGTH
      ? rawText.slice(0, MAX_PREVIEW_LENGTH) + "…"
      : rawText;

  const turnId = messageEle.getAttribute("data-message-id") || "";

  const btn = document.createElement("button");
  btn.className = "nav-btn";
  btn.style.setProperty("--msg-preview", JSON.stringify(text));
  btn.setAttribute("data-turn-id", turnId);
  btn.setAttribute("data-nav-index", String(index));

  const line = document.createElement("div");
  line.className = "msg-line";
  btn.appendChild(line);

  btn.onclick = () => {
    messageEle.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return btn;
};
