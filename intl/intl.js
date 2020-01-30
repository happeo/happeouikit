const translations = require("./translations.json");

/**
 * Returns message strings from
 * object by the locale. Falls back to language if
 * no exact locale is found.
 *
 * Returns function that takes in the locale parameter.
 *
 * Done like this for easy testablilty
 *
 * @param {Object} messages
 * returns {Function}
 */
export const _getMessagesFromObject = (messages, defaultLocale) => locale => {
  // First check if the exact locale found
  if (messages[locale]) return messages[locale];
  // Then let's check if there is language
  const language = locale.split("-")[0];
  if (messages[language]) return messages[language];
  // Finally if nothing else is found use
  if (defaultLocale && messages[defaultLocale]) return messages[defaultLocale];
  return {};
};

/**
 * Get translated strings based on current locale
 * @param {String} locale
 */
export const getTranslations = _getMessagesFromObject(translations, "en-US");
