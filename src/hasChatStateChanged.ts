export const hasChatStateChanged = (btnList: NodeListOf<HTMLButtonElement>, articleList: NodeListOf<HTMLElement>) => {
    if (btnList.length !== articleList.length) return true;

    for (let index = 0; index < btnList.length; index++) {
        const btnAttr = btnList[index].getAttribute("data-turn-id")
        const articleAttr = articleList[index].getAttribute("data-turn-id")

        if (btnAttr !== articleAttr) return true;
    }

    return false
}