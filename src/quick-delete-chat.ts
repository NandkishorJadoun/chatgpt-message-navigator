export function enhanceSidebar() {
  const recentChatsContainer = document.querySelector<HTMLElement>('[class*="group/sidebar-expando-section"]');

  if (!recentChatsContainer) {
    setTimeout(enhanceSidebar, 500);
    return;
  }

  injectDeleteButtons(recentChatsContainer);
  startObserver(recentChatsContainer);
}

function injectDeleteButtons(nav: Element) {
  const items = nav.querySelectorAll<HTMLAnchorElement>("li>a");

  for (const item of items) {
    if (item.querySelector(".delete-button")) continue;

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15">
  <path d="M0 0h15v15H0z" fill="none" /><path fill="currentColor" d="M3.64 2.27L7.5 6.13l3.84-3.84c.17-.18.41-.29.66-.29c.55 0 1 .45 1 1c0 .25-.09.49-.27.66L8.84 7.5l3.89 3.89c.16.16.26.38.27.61c0 .55-.45 1-1 1a.93.93 0 0 1-.69-.27L7.5 8.87l-3.85 3.85c-.17.18-.4.28-.65.28c-.55 0-1-.45-1-1c0-.25.09-.49.27-.66L6.16 7.5L2.27 3.61A.93.93 0 0 1 2 3c0-.55.45-1 1-1c.24 0 .47.1.64.27" />
</svg>`;

    deleteButton.className = "delete-button";

    deleteButton.addEventListener("click", async (e) => {
      e.stopPropagation();
      e.preventDefault();

      deleteButton.disabled = true;
      deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
  <path d="M0 0h24v24H0z" fill="none" /><path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity=".5" />
  <path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
  <animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate" />
  </path>
</svg>`

      const pattern = new URLPattern({ pathname: '/c/:id' });
      const match = pattern.exec(item.href);

      if (!match || !match.pathname.groups.id) {
        console.log("The URL did not match the pattern.");
        return
      }

      const chatId = match.pathname.groups.id
      const isDeleted = await deleteHandler(chatId)

      if (isDeleted) {
        item.style.display = "none"
      } else {
        deleteButton.disabled = false;
        deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15">
  <path d="M0 0h15v15H0z" fill="none" /><path fill="currentColor" d="M3.64 2.27L7.5 6.13l3.84-3.84c.17-.18.41-.29.66-.29c.55 0 1 .45 1 1c0 .25-.09.49-.27.66L8.84 7.5l3.89 3.89c.16.16.26.38.27.61c0 .55-.45 1-1 1a.93.93 0 0 1-.69-.27L7.5 8.87l-3.85 3.85c-.17.18-.4.28-.65.28c-.55 0-1-.45-1-1c0-.25.09-.49.27-.66L6.16 7.5L2.27 3.61A.93.93 0 0 1 2 3c0-.55.45-1 1-1c.24 0 .47.1.64.27" />
</svg>`
      }
    })

    item.append(deleteButton);
  }
}

let token = "";
async function getToken() {
  const res = await fetch('/api/auth/session');
  const { accessToken } = await res.json();
  return accessToken
}

async function deleteHandler(id: string) {
  if (!token) {
    token = await getToken();
  }

  const url = `https://chatgpt.com/backend-api/conversation/${id}`;

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ is_visible: false })
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    await response.json();
    return true;
  } catch (error) {
    return false;
  }
}

let sidebarObserver: MutationObserver | null = null;

function startObserver(nav: HTMLElement) {
  if (sidebarObserver) return;

  sidebarObserver = new MutationObserver(() => {
    injectDeleteButtons(nav);
  });

  sidebarObserver.observe(nav, { childList: true, subtree: true });
}