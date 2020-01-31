import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import RcModal from "react-modal";
import { white } from "@happeouikit/colors";
import { IconClose } from "@happeouikit/icons";
import { TextDelta } from "@happeouikit/typography";
import {
  ButtonPrimary,
  ButtonSecondary,
  IconButton
} from "@happeouikit/buttons";
import { media } from "@happeouikit/layout";
import { OverlayStyle } from "./styles";

const Modal = ({
  children,
  isOpen,
  headerText,
  close,
  width,
  top,
  footer,
  okCallback,
  okText,
  cancelText,
  iconClose,
  footerComponent,
  disabled,
  ...props
}) => {
  return (
    <StyledModal
      isOpen={isOpen}
      ariaHideApp={false}
      width={width}
      top={top}
      overlayClassName="Overlay"
    >
      <OverlayStyle />
      <ModalWrapper {...props}>
        {(headerText || iconClose) && (
          <ModalHeader headerText={headerText}>
            {headerText && <TextDelta>{headerText}</TextDelta>}
            {iconClose && (
              <IconButton icon={IconClose} isActionIcon onClick={close} />
            )}
          </ModalHeader>
        )}
        <ModalContent>{children}</ModalContent>
        {footer && (
          <ModalFooter>
            {footerComponent || (
              <FooterWrapper>
                <ButtonSecondary text={cancelText} onClick={close} />
                {okCallback && (
                  <ButtonPrimary
                    text={okText}
                    onClick={okCallback}
                    disabled={disabled}
                  />
                )}
              </FooterWrapper>
            )}
          </ModalFooter>
        )}
      </ModalWrapper>
    </StyledModal>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.node,
  headerText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  close: PropTypes.func,
  width: PropTypes.string,
  footer: PropTypes.bool,
  okCallback: PropTypes.func,
  okText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  cancelText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  iconClose: PropTypes.bool,
  footerComponent: (props, propName) => {
    if (!props.footer && props[propName]) {
      return new Error(`Cannot set ${propName} when 'footer' is false.`);
    }
  },
  disabled: PropTypes.bool
};

Modal.defaultProps = {
  isOpen: false,
  noHeader: false,
  width: "300px",
  footer: true,
  okText: "OK",
  cancelText: "Cancel",
  iconClose: false,
  disabled: false
};

const StyledModal = styled(RcModal)`
  position: relative;
  margin: 0 auto;
  top: 0;
  right: auto;
  bottom: auto;
  width: 100%;
  outline: none;
  display: flex;
  flex-direction: column;
  z-index: 1050;
  max-height: calc(100vh - 120px);

  ${media.min.sm`
    max-width: ${({ width }) => width || "300px"};
  `}
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  background-color: ${white};
  border-radius: 6px;
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.1);

  ${media.min.sm`
    height: auto;
  `}
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: ${({ headerText }) =>
    headerText ? "space-between" : "flex-end"};
  align-items: center;
  margin-bottom: 20px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 0 0 auto;
`;

const FooterWrapper = styled.div`
  padding-top: 40px;
  display: flex;
  width: 100%;

  button {
    margin-left: 16px;
    flex: 1 0 auto;
  }

  ${media.min.sm`
    width: auto;
  `}
`;

const ModalContent = styled.div`
  flex: 1 1 auto;
`;
export default Modal;
