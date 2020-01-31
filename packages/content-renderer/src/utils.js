import linkifyHtml from "linkifyjs/html";
import xss from "xss";

import { fixEmojioneBug, shortToUnicode } from "@happeouikit/emojis";
import { safeTagsAndAttributes } from "./constants";
import htmlConverter from "./htmlConverter";

/**
 * @name toHtml
 * @description Converts markdown to html, adds space to end of String
 *               The non-breaking space helps users to add text if last word is mention item
 * @author Antero Hanhirova
 * @param {String} - Markdown
 * @returns {String} - Html
 */

const toHtml = (str = "", type = "html") => {
  str = shortToUnicode(str);
  str = fixEmojioneBug(str);
  if (type === "markdown") {
    str = htmlConverter.makeHtml(str);
  }
  return linkifyHtml(str);
};

/**
 * @name toSafeText
 * @description Returns filtered text with filterXSS library
 * @author Antero Hanhirova
 * @param {String} - Text to whitelist
 * @returns {String}
 */
const toSafeText = text => {
  return xss(text, {
    whiteList: safeTagsAndAttributes,
    stripIgnoreTag: true
  })
    .replace(/&nbsp;/g, " ")
    .replace(/\u2060/g, ""); // Replaces a hidden character that resulted in a "?"-character in backend
};

export { toHtml, toSafeText };
