export const createBtn = (messageEle: HTMLElement) => {
  const text =
    messageEle.textContent;

  const turnId = messageEle.getAttribute("data-message-id") || "";

  const role = messageEle.getAttribute("data-message-author-role");

  const btn = document.createElement("button");

  btn.className = "nav-btn";
  btn.style.setProperty("--msg-preview", JSON.stringify(text));
  btn.setAttribute("data-turn-id", turnId);

  const line = document.createElement("div");
  line.id = "msg-line";
  line.style.width = role === "user" ? "40%" : "70%";
  btn.appendChild(line);

  btn.onclick = () => {
    messageEle.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return btn;
};
