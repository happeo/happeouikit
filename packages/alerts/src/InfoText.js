import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { TinyText } from "@happeokit/typography";
import { active, success, alert, toBgLight } from "@happeokit/colors";

function InfoText({ text, state, ...props }) {
  const stateMap = { info: active, success, error: alert };

  return (
    <Container color={stateMap[state]} {...props}>
      <TinyText color={stateMap[state]}>{text}</TinyText>
    </Container>
  );
}

InfoText.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  state: PropTypes.oneOf(["info", "error", "success"])
};

const Container = styled.div`
  border-radius: 6px;
  background: ${({ color }) => toBgLight(color)};
  min-width: 285px;
  padding: 8px 12px;
  position: relative;

  :after {
    content: "";
    position: absolute;
    width: 8px;
    left: 0px;
    top: 0;
    bottom: 0;
    background: ${({ color }) => color};
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }
`;

export default InfoText;
