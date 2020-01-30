import React, { useState, Fragment } from "react";
import styled from "styled-components";
import { FileModal } from "./index";
import { ButtonPrimary } from "@happeokit/buttons";

const ModalExample = ({ allowedType, canSelectTeamDrive }) => {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => {
    setIsOpen(false);
  };

  return (
    <Fragment>
      <ButtonRow>
        <ButtonPrimary
          text="Modal with header and footer"
          onClick={() => setIsOpen(true)}
        />
      </ButtonRow>

      {isOpen && (
        <FileModal
          allowedType={allowedType}
          canSelectTeamDrive={canSelectTeamDrive}
          modalOpen={isOpen}
          close={close}
          onSave={file => {
            console.log("selected file", file);
            close();
          }}
        />
      )}
    </Fragment>
  );
};

const ButtonRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-flow: wrap;
`;

export default ModalExample;
