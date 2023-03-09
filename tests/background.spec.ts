import { chrome } from "jest-chrome";
import { navigationBtnPressed } from "../src/background";

function buildTab(params: any) {
  const defaults = {
    id: 1,
    index: 0,
    pinned: false,
    highlighted: false,
    windowId: 1,
    active: true,
    incognito: false,
    status: "complete",
    title: "Test Tab",
    url: "http://example.com",
    favIconUrl: "",
    mutedInfo: undefined,
    width: 1024,
    height: 768,
    sessionId: "1234567890",
  };
  return { ...defaults, ...params };
}

describe("navigationBtnPressed", () => {
  let tabsMessageSpy: jest.SpyInstance<any, any>;
  beforeAll(() => {
    tabsMessageSpy = jest.spyOn(chrome.tabs, "sendMessage");
  });

  afterAll(() => {
    tabsMessageSpy.mockClear();
  });

  it.each([["up"], ["down"], ["left"], ["right"]])(
    `should emit an event for an active tab and '%p' command`,
    async (command: string) => {
      const tabId = 123;
      const message = { command: command };
      const tab = buildTab({ id: tabId, active: true });
      chrome.tabs.query.mockResolvedValueOnce([tab]);

      await navigationBtnPressed(message.command);

      expect(tabsMessageSpy).toHaveBeenCalledWith(tabId, message);
    }
  );

  it("should not emit an event if there's no active tab", async () => {
    const message = { command: "up" };
    chrome.tabs.query.mockResolvedValueOnce([]);

    await navigationBtnPressed(message.command);

    expect(tabsMessageSpy).not.toHaveBeenCalled();
  });

  it.each`
    command         | description
    ${"up-command"} | ${"including expected verbiage"}
    ${"another"}    | ${"not expected"}
  `(
    "should not emit an event for $description commands",
    async ({ command }) => {
      const message = { command: command };
      const tab = buildTab({});
      chrome.tabs.query.mockResolvedValueOnce([tab]);

      await navigationBtnPressed(message.command);

      expect(tabsMessageSpy).not.toHaveBeenCalled();
    }
  );
});
