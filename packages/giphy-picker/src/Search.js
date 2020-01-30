import React from "react";
import { injectIntl } from "react-intl";
import { IconSearch } from "@happeokit/icons";
import { Input } from "@happeokit/form-elements";
import messages from "./messages";

const Search = props => {
  const { intl, onChange } = props;
  return (
    <div style={{ padding: "16px" }}>
      <Input
        icon={IconSearch}
        placeholder={intl.formatMessage(messages.searchPlaceholder)}
        onChange={onChange}
      />
    </div>
  );
};
export default injectIntl(Search);
