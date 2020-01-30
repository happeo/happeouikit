export const toCamelCase = str => {
  return str.replace(/(_|-|,|\.)(.)/g, match => match[1].toUpperCase());
};

const HASHTAG_MAX_LENGTH = 64;
export const sanitiseHashtag = hashtag => {
  if (hashtag && typeof hashtag === "string") {
    const regex = new RegExp(
      /[^\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}#]/u
    );

    const withoutConsecutiveUnderscores = hashtag.replace(/_+/g, "_");
    const match = withoutConsecutiveUnderscores.match(regex);
    const firstDisallowedCharIndex =
      (match && match.index) || withoutConsecutiveUnderscores.length;

    return addHashSign(
      withoutConsecutiveUnderscores
        .substring(0, Math.min(firstDisallowedCharIndex, HASHTAG_MAX_LENGTH))
        .toLocaleLowerCase()
    );
  }
  return "";
};

/**
 * Add hash sign to the start of string, if missing
 * @param input
 * @returns {string}
 */
export const addHashSign = input => {
  if (input.startsWith("#")) return input;

  return "#" + input;
};
