import {
  emojiList,
  convert,
  emojiRegShortNames,
  unicodeCharRegex,
  shortnameConversionMap,
  convertEmojioneBugMap
} from "./rawList";
import { sortBy } from "lodash";

let allEmojis = [];



function _replaceAll(string, find) {
  var escapedFind = _escapeRegExp(find); //sorted largest output to smallest output
  var search = new RegExp(
    "<object[^>]*>.*?</object>|<span[^>]*>.*?</span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|(" +
      escapedFind +
      ")",
    "gi"
  );

  // callback prevents replacing anything inside of these common html tags as well as between an <object></object> tag

  const replace = (entire, m1) => {
    return typeof m1 === "undefined" || m1 === ""
      ? entire
      : shortnameConversionMap[m1];
  };

  return string.replace(search, replace);
}

function _escapeRegExp(string) {
  return string.replace(/[-[\]{}()*+?.,;:&\\^$#\s]/g, "\\$&");
}

/*
 *
 * Public functions
 *
 * /

/**
 * @name removeEmojis
 * @description Removes all emojis from string, uses emoji for emoji removal
 * @author Antero Hanhirova
 * @param {String} - String to remove emojis
 * @returns {String} - String without emojis
 */
const removeEmojis = string => {
  var allEmojis = _escapeRegExp(unicodeCharRegex);
  var regex = new RegExp(allEmojis, "gi");
  return string.replace(regex, "");
}

/**
 * @name emojisToShort
 * @description Emojis to short
 * @author Antero Hanhirova
 * @param {String} -
 * @returns {String} -
 */
const emojisToShort = str => _replaceAll(str, unicodeCharRegex);

/**
 * @name shortToUnicode
 * @description Shorts to Unicode
 * @author Antero Hanhirova
 * @param {} -
 * @returns {} -
 */
const shortToUnicode = str => {
  // replace regular shortnames first
  var unicode;
  str = str.replace(emojiRegShortNames, function(shortname) {
    if (
      typeof shortname === "undefined" ||
      shortname === "" ||
      !(shortname in emojiList)
    ) {
      // if the shortname doesnt exist just return the entire matchhju
      return shortname;
    }
    unicode = emojiList[shortname].uc_output.toUpperCase();
    return convert(unicode);
  });
  return str;
}

/**
 * @name fixEmojioneBug
 * @description Fixes emojione bug
 * @author Antero Hanhirova
 * @param {String} -
 * @returns {String} -
 */
const fixEmojioneBug = content => {
  convertEmojioneBugMap.map(fix => {
    var regex = new RegExp(fix[0], "g");
    content = content.replace(regex, fix[1]);
  });
  return content;
}

/**
 * @name listAllEmojis
 * @description Lists all emojis
 * @author Antero Hanhirova
 * @returns {Array} -
 */
const listAllEmojis = () => {
  if (allEmojis.length > 0) return allEmojis;

  for (let key in emojiList) {
    // Ignore _tone emojis for now. Only use default ones.
    if (!key.includes("_tone")) {
      let formattedEmoji = {
        unicode: shortToUnicode(key),
        name: key,
        category: emojiList[key].category
      };

      allEmojis.push(formattedEmoji);
    }
  }
  allEmojis = sortBy(allEmojis, "name");
  return allEmojis;
}

export {
  shortToUnicode,
  emojisToShort,
  removeEmojis,
  fixEmojioneBug,
  listAllEmojis
};
