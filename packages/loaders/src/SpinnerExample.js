/**
 *
 * Default Loader component
 *
 */
import React, { useState } from "react";
import styled from "styled-components";
import Spinner from "./Spinner";
import { active } from "@happeouikit/colors";

const SpinnerExample = () => {
  const [loadingState, setLoadingState] = useState("loading");

  return (
    <Container>
      <Spinner state={loadingState} />
      <Controls>
        <LinkButton onClick={() => setLoadingState("loading")}>
          Loading
        </LinkButton>
        <LinkButton onClick={() => setLoadingState("success")}>
          Success
        </LinkButton>
        <LinkButton onClick={() => setLoadingState("error")}>Error</LinkButton>
      </Controls>
    </Container>
  );
};

const Container = styled.div`
  padding: 32px;
`;
const Controls = styled.div``;
const LinkButton = styled.a`
  cursor: pointer;
  color: ${active};
  margin-top: 16px;
  margin-right: 16px;
`;
export default SpinnerExample;
