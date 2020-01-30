import React from "react";
import styled, { css } from "styled-components";
import { gray04, white } from "@happeokit/colors";
import { radius400 } from "../rectangles";

const Box = styled.div`
  width: 128px;
  height: 96px;
  border-radius: ${({ borderRadius }) =>
    borderRadius ? borderRadius : radius400};
  background-color: ${({ shadow }) => (shadow ? white : gray04)};
  ${({ shadow }) =>
    !!shadow &&
    css`
      box-shadow: ${shadow};
    `}
`;

const Wrapper = styled.div`
  margin: 0 32px 32px 0;
  display: inline-block;
`;

const RectangleExample = ({ borderRadius, name, shadow = "" }) => {
  return (
    <Wrapper>
      <Box borderRadius={borderRadius} shadow={shadow} />
      <p>{name}</p>
    </Wrapper>
  );
};

const Circle = styled(Box)`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

export const CircleExample = ({ name, shadow = "" }) => {
  return (
    <Wrapper>
      <Circle shadow={shadow} />
      <p>{name}</p>
    </Wrapper>
  );
};

export default RectangleExample;
