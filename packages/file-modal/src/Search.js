import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Input } from "@happeokit/form-elements";
import { IconSearch, IconClose } from "@happeokit/icons";
import { injectIntl } from "react-intl";
import messages from "./messages";
import { IconButton } from "@happeokit/buttons";

const Search = ({ intl, placeholder, getValue }) => {
  const [value, setValue] = useState("");

  const onChange = e => {
    const { value } = e.target;
    if (value !== undefined) {
      setValue(value);
      getValue(value);
    }
  };

  const clearInput = () => {
    setValue("");
    getValue("");
  };

  return (
    <InputWrapper>
      <Input
        onChange={onChange}
        placeholder={intl.formatMessage(placeholder || messages.search)}
        icon={IconSearch}
        value={value}
      />
      {value && (
        <StyledIconButton icon={IconClose} isActionIcon onClick={clearInput} />
      )}
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  position: relative;
`;
const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 8px;
  top: 8px;
`;

Search.propTypes = {
  getValue: PropTypes.func,
  placeholder: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};
export default injectIntl(Search);
