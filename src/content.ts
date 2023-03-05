console.log("Hello world");
chrome.runtime.onMessage.addListener(processMessage);

// When the context script is loaded we need to build the page tree and prepare it for navigation.
// Set current node to the top visible node.
// On message, navigate to a respective node and focus on it.

async function processMessage(message: any, sender: any, sendResponse: any) {
  console.log(`Message=${JSON.stringify(message)}`);
  // Message={"command":"down"}
  console.log(`Sender=${JSON.stringify(sender)}`);
  // Sender={"id":"pepablbafnpilfgogmgiacbnlmngmmad","origin":"null"}
  console.log(`SendResponse=${JSON.stringify(sendResponse)}`);
  // SendReponse=undefined
}

// chrome.runtime.onMessage.addListener(details => {
//     console.log(`Message=${JSON.stringify(details)}`);
//     console.log(`Links:`);
//     const links: NodeListOf<HTMLElement> = document.querySelectorAll('a');
//     const filtered_links: HTMLElement[] = Array.from(links).filter(link => (link as any).checkVisibility());
//     console.log(links, filtered_links);
// })

// element.checkVisibility() = true/false
