import * as emojiService from "./emojiService";
import { trackEvent, events } from "@universe/analytics";

const config = {
  trigger: ":",
  menuItemTemplate: function(item) {
    const { unicode, name } = item.original;

    return `
        <a class="user-mention" data-emoji-name="${name}">
          <span class="emoji-picker__emoji">${unicode}</span>
          <div class="user-mention__name">
              <p>${name}</p>
          </div>
        </a>
      `;
  },
  selectTemplate: function(item) {
    const { unicode, name } = item.original;
    trackEvent(events.EDITOR_SELECT_EMOJI_QUICK);
    emojiService.addFrequentEmoji({ name });

    return unicode;
  },
  lookup: "name",
  fillAttr: "name",
  values: emojiService.listAllEmojis()
};

export default config;
