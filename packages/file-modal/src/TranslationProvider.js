import React, { Component, Fragment } from "react";
import { IntlProvider } from "react-intl";

import { resolveMessages, DEFAULT_LOCALE } from "@happeokit/translations";
import translatedMessages from "../../../intl/translations.json";

const messages = resolveMessages(translatedMessages, DEFAULT_LOCALE)(
  DEFAULT_LOCALE
);

class TranslationsProvider extends Component {
  render() {
    return (
      <IntlProvider
        locale={DEFAULT_LOCALE}
        key={DEFAULT_LOCALE}
        defaultLocale={DEFAULT_LOCALE}
        messages={messages}
        textComponent={Fragment}
      >
        {this.props.children}
      </IntlProvider>
    );
  }
}

export default TranslationsProvider;
