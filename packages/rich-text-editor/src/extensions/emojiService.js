import emojione from "emojione";
import orderBy from "lodash.orderby";

let emojis = [];
const emojiLocalKey = "frequent-emojis";

export function frequentEmojiShortNames() {
  try {
    const storedEmojis = window.localStorage.getItem(emojiLocalKey);
    const frequentEmojis = JSON.parse(storedEmojis);
    if (frequentEmojis) {
      return frequentEmojis.emojiList;
    }
    return [];
  } catch (e) {
    return [];
  }
}

export function saveFrequentEmojis(frequentEmojis) {
  const emojiObj = {
    id: "emojis",
    emojiList: frequentEmojis
  };
  window.localStorage.setItem(emojiLocalKey, JSON.stringify(emojiObj));
}

export function addFrequentEmoji(emoji) {
  let frequentEmojis = frequentEmojiShortNames();
  if (!frequentEmojis.includes(emoji.name)) {
    frequentEmojis.push(emoji.name);
  }
  saveFrequentEmojis(frequentEmojis);
}

export function listAllEmojis(force) {
  if (!force && emojis.length > 0) return emojis;

  const rawList = emojione.emojioneList;
  const frequentEmojis = frequentEmojiShortNames();
  emojis = [];

  for (let key of Object.keys(rawList)) {
    // Ignore _tone emojis for now. Only use default ones.
    if (!key.includes("_tone")) {
      const formattedEmoji = {
        unicode: emojione.shortnameToUnicode(key),
        name: key,
        favorite: frequentEmojis.includes(key),
        category: rawList[key].category
      };

      emojis.push(formattedEmoji);
    }
  }
  return orderBy(emojis, [emoji => emoji.favorite, "name"], ["desc", "asc"]);
}
