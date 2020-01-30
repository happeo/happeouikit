import { resolveMessages } from "./resolveMessages";

const testMessages = {
  fi: "apua",
  "sv-SE": "hjälp",
  "en-US": "help"
};

describe("_getMessagesFromObject", () => {
  test("should return the language section if no locale found", () => {
    expect(resolveMessages(testMessages)("fi-FI")).toBe("apua");
  });
  test("should return the exact locale if such found", () => {
    expect(resolveMessages(testMessages)("sv-SE")).toBe("hjälp");
  });
  test("should return default messages, ", () => {
    expect(resolveMessages(testMessages, "en-US")("nl-NL")).toBe("help");
  });
});
