import React, { useRef } from "react";
import { IconFiles } from "@happeokit/icons";
import { IconButton, ButtonSecondary } from "@happeokit/buttons";
import styled from "styled-components";
import PropTypes from "prop-types";

const FilePicker = ({ onSelected = () => {}, disabled, text }) => {
  const inputRef = useRef(null);

  const onClick = () => {
    inputRef.current && inputRef.current.click();
  };

  const handleChangeInput = e => {
    const files = e.target.files;
    if (files) {
      onSelected && onSelected(files);
    }
  };

  const getButton = () => {
    if (text)
      return (
        <ButtonSecondary
          text={text}
          icon={IconFiles}
          onClick={onClick}
          disabled={disabled}
        />
      );
    return (
      <IconButton icon={IconFiles} onClick={onClick} disabled={disabled} />
    );
  };

  return (
    <StyledIconButton>
      {getButton()}
      <input
        type="file"
        id="file"
        multiple
        onChange={handleChangeInput}
        ref={inputRef}
      />
    </StyledIconButton>
  );
};

FilePicker.propTypes = {
  onSelected: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  text: PropTypes.string
};

const StyledIconButton = styled.div`
  input[type="file"] {
    display: none;
  }
`;

export default FilePicker;
