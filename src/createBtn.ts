export const createBtn = (articleEle: HTMLElement) => {

    // get text and id from article message

    const text = articleEle.textContent.replace(/\s+/g, " ").trim().substring(0, 150);
    const turnId = articleEle.getAttribute("data-turn-id") || "";

    const btn = document.createElement("button");

    // set className, style property and data attribute

    btn.className = "nav-btn";
    btn.style.setProperty("--msg-preview", `"${text}"`);
    btn.setAttribute("data-turn-id", turnId)

    const line = document.createElement("div");

    // set id and width of line of button

    line.id = "msg-line";
    line.style.width = articleEle.dataset.turn === "user" ? "40%" : "70%";

    btn.appendChild(line);

    btn.onclick = () => {
        articleEle.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return btn
}