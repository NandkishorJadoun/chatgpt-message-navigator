export const createBtn = (messageSection: HTMLElement) => {
    const turnId = messageSection.getAttribute("data-turn-id") || "";
    const btn = document.createElement("button");
    btn.className = "nav-btn";
    btn.setAttribute("data-turn-id", turnId);

    const line = document.createElement("div");
    line.id = "msg-line";
    line.style.width = messageSection.dataset.turn === "user" ? "40%" : "70%";
    btn.appendChild(line);

    let cachedText = "";

    btn.addEventListener("mouseenter", () => {
        if (cachedText) return

        const target = document.querySelector(
            `section[data-turn-id="${turnId}"]`,
        );

        if (!target) return;

        const previewText = target.textContent
            .replace(/\s+/g, " ")
            .trim()
            .substring(0, 150);

        if (!previewText) return

        cachedText = previewText
        btn.style.setProperty("--msg-preview", JSON.stringify(cachedText));
    })


    btn.addEventListener("click", () => {
        const target = document.querySelector(
            `section[data-turn-id="${turnId}"]`,
        );
        if (!target) return;

        target.scrollIntoView({ block: "start" })
    });

    return btn;
};
