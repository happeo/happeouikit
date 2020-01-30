import React, { Fragment } from "react";
import styled from "styled-components";
import { active, gray01, gray04, gray06 } from "@happeokit/colors";
import PropTypes from "prop-types";
import { BodyUI, sansFamily } from "@happeokit/typography";

const Textarea = ({ cols, rows, label, ...props }) => {
  return (
    <Fragment>
      {!!label && (
        <Label>
          <BodyUI color={gray01}>{label}</BodyUI>
        </Label>
      )}
      <StyledTextarea cols={cols} rows={rows} {...props} />
    </Fragment>
  );
};

Textarea.propTypes = {
  rows: PropTypes.number,
  cols: PropTypes.number
};

const StyledTextarea = styled.textarea`
  font-family: ${sansFamily};
  border-radius: 4px;
  ${props => (props.cols ? "" : "width: 100%;")};
  ${props => (props.rows ? "" : "height: 100%;")};
  padding: 10px 12px;
  border: solid 1px ${gray06};
  box-sizing: border-box;
  box-shadow: none;
  font-size: 14px;

  :hover {
    border-color: ${gray04};
  }

  :active {
    outline: none;
    border-color: ${active};
  }

  :focus {
    outline: none;
    border-color: ${active};
  }
`;

const Label = styled.div`
  margin: 4px 0;
`;

export default Textarea;
