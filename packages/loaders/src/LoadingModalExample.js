/**
 *
 * Default Loader component
 *
 */
import React, { useState } from "react";
import styled from "styled-components";
import { active } from "@happeokit/colors";
import LoadingModal from "./LoadingModal";

const LoadingModalExample = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <Container>
      <LinkButton onClick={() => setModalIsOpen(true)}>Open modal</LinkButton>
      <LoadingModal
        isOpen={modalIsOpen}
        title={"Hahaa! You cannot close me"}
        description={"You fool! You need to refresh this page now. Hahaha!"}
        state={"loading"}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 32px;
`;
const LinkButton = styled.a`
  cursor: pointer;
  color: ${active};
  margin-top: 16px;
  margin-right: 16px;
`;
export default LoadingModalExample;
