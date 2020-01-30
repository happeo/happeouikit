import React, { Fragment } from "react";
import { IntlProvider } from "react-intl";

import { resolveMessages, DEFAULT_LOCALE } from "./index";

const TranslationProvider = ({ translatedMessages, children }) => {
  const messages = resolveMessages(translatedMessages, DEFAULT_LOCALE)(
    DEFAULT_LOCALE
  );
  return (
    <IntlProvider
      locale={DEFAULT_LOCALE}
      key={DEFAULT_LOCALE}
      defaultLocale={DEFAULT_LOCALE}
      messages={messages}
      textComponent={Fragment}
    >
      {children}
    </IntlProvider>
  );
};

export default TranslationProvider;
