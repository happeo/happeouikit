import React from "react";
import styled from "styled-components";
import { radius400 } from "../rectangles";

const Box = styled.div`
  width: 100%;
  height: 40px;
  border-radius: ${radius400};
  border: ${({ border }) => border};
`;

const Wrapper = styled.div`
  margin: 0 32px 20px 0;
`;

const BorderExample = ({ border, name }) => {
  return (
    <Wrapper>
      <Box border={border} />
      <p>{name}</p>
    </Wrapper>
  );
};

export default BorderExample;
