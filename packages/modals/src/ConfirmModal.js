import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Modal, ModalIcon } from "./index";
import { TextZeta, TextDelta } from "@happeouikit/typography";
import { Spacer } from "@happeouikit/layout";
import { gray05 } from "@happeouikit/colors";
import { ButtonPrimary, ButtonSecondary } from "@happeouikit/buttons";
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
          text={okText}
          onClick={okCb}
          type={buttonType}
          disabled={btnDisabled}
        />
        {!hideCancel && <ButtonSecondary text={cancelText} onClick={close} />}
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
  btnDisabled: PropTypes.bool,
  okText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  cancelText: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

ConfirmModal.defaultProps = {
  state: MODAL_STATES.success,
  okText: "OK",
  cancelText: "Cancel"
};

export default ConfirmModal;
