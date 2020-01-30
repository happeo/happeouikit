/**
 * Returns message strings from
 * object by the loale. Fallbacks to language if
 * no exact locale is found.
 *
 * Returns function that takes in the locale parameter.
 *
 * Done like this for easy testablilty
 *
 * @param {Object} messages
 * returns {Function}
 */
export const resolveMessages = (messages, defaultLocale) => locale => {
  // First check if the exact locale found
  if (messages[locale]) return messages[locale];
  // Then let's check if there is language
  const language = locale.split("-")[0];
  if (messages[language]) return messages[language];
  // Finally if nothing else is found use
  if (defaultLocale && messages[defaultLocale]) return messages[defaultLocale];
  return {};
};
