import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { msg } from "@happeokit/translations";
import messages from "./messages";
import { TinyText } from "@happeokit/typography";
import { alert, toBgLight } from "@happeokit/colors";

/**
 *
 * ErrorMessage
 *
 */
const ErrorMessage = ({ text }) => {
  return (
    <ErrorContainer>
      <TinyText color={alert}>{msg(text || messages.generalError)}</TinyText>
    </ErrorContainer>
  );
};

ErrorMessage.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

const ErrorContainer = styled.div`
  border-radius: 6px;
  background: ${toBgLight(alert)};
  min-width: 285px;
  padding: 8px 16px;
  position: relative;

  :after {
    content: "";
    position: absolute;
    width: 8px;
    left: 0px;
    top: 0;
    bottom: 0;
    background: ${alert};
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }
`;

export default ErrorMessage;
