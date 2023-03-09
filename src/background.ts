chrome.commands.onCommand.addListener(navigationBtnPressed);

const ARROW_KEYS = ["up", "down", "left", "right"];

export async function navigationBtnPressed(command: string) {
  console.debug(`Command "${command}" triggered`);
  if (!ARROW_KEYS.includes(command)) return;
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  if (!tab) return;
  await chrome.tabs.sendMessage(tab.id!, { command: command });
}
