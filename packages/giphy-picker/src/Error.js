import React from "react";
import { injectIntl } from "react-intl";
import messages from "./messages";
import { TextDelta } from "@happeokit/typography";

const Error = ({ intl }) => (
  <TextDelta bold style={{ padding: "16px" }}>
    {intl.formatMessage(messages.error)}
  </TextDelta>
);

export default injectIntl(Error);
