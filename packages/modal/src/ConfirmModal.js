import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { msg } from "@happeokit/translations";
import messages from "./messages";
import { Modal, ModalIcon } from "./index";
import { TextZeta, TextDelta } from "@happeokit/typography";
import { Spacer } from "@happeokit/layout";
import { gray05 } from "@happeokit/colors";
import { ButtonPrimary, ButtonSecondary } from "@happeokit/buttons";
import { MODAL_STATES } from "./constants";

/**
 *
 * ConfirmModal
 *
 */
const ConfirmModal = ({
  isOpen,
  close,
  bodyText,
  header,
  okCb,
  okText,
  cancelText,
  state,
  btnDisabled,
  hideCancel
}) => {
  const buttonType = state === MODAL_STATES.success ? "success" : "alert";

  return (
    <Modal isOpen={isOpen} close={close} width="350px" footer={false}>
      <BodyWrapper>
        {state && <ModalIcon state={state} />}
        <Spacer />
        <TextDelta>{header}</TextDelta>
        <Spacer />
        <TextZeta color={gray05}>{bodyText}</TextZeta>
      </BodyWrapper>
      <ModalFooter>
        <ButtonPrimary
          text={okText || msg(messages.ok)}
          onClick={okCb}
          type={buttonType}
          disabled={btnDisabled}
        />
        {!hideCancel && (
          <ButtonSecondary
            text={cancelText || msg(messages.cancel)}
            onClick={close}
          />
        )}
      </ModalFooter>
    </Modal>
  );
};

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  ul {
    list-style: disc;
    padding-inline-start: 16px;
  }

  ${TextZeta}, ${TextDelta} {
    text-align: center;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 24px;

  button {
    margin-bottom: 8px;
  }
`;

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  bodyText: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  header: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  okCb: PropTypes.func,
  hideCancel: PropTypes.bool,
  state: PropTypes.string,
  btnDisabled: PropTypes.bool
};

ConfirmModal.defaultProps = {
  state: MODAL_STATES.success
};

export default ConfirmModal;