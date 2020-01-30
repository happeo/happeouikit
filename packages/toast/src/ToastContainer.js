import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  alert,
  toBgLight,
  success,
  warn,
  black,
  white
} from "@happeokit/colors";
import { TextZeta, BodyUI } from "@happeokit/typography";
import { CSSTransition } from "react-transition-group";
import { shadow200 } from "@happeokit/theme";
import { IconInfo, IconClose, IconRefresh } from "@happeokit/icons";
import { ButtonSecondary, IconButton } from "@happeokit/buttons";
import { ACTIONS, EVENTS } from "./constants";

/**
 *
 * Toast container to be used at the root of the app
 *
 */
class ToastContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      type: "success"
    };
  }

  componentDidMount() {
    window.addEventListener(EVENTS.SHOW, this.show);
    window.addEventListener(EVENTS.HIDE, this.hide);
  }

  show = e => {
    this.hide(); // hide any active tooltips
    setTimeout(() => {
      const { type, message, undo, undoText } = e.detail;
      this.setState({ show: true, type, message, undo, undoText });
      this.setTimer();
    }, 300);
  };

  hide = () => {
    this.setState({ show: false });
    clearTimeout(this.timer);
  };

  componentWillUnmount() {
    window.removeEventListener(EVENTS.SHOW, this.show);
    window.removeEventListener(EVENTS.HIDE, this.hide);
    clearTimeout(this.timer);
  }

  setTimer = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.setState({ show: false });
      this.timer = null;
    }, this.props.delay);
  };

  render() {
    const { show, type, message, undo, undoText } = this.state;
    const { position } = this.props;
    let color = black;
    let bg = white;

    if (type === ACTIONS.ERROR) {
      color = alert;
      bg = toBgLight(alert);
    }

    return (
      <CSSTransition in={show} timeout={100} classNames="toast" unmountOnExit>
        <Container bg={bg} position={position}>
          <TextWrapper>
            <IconContainer>
              <Icon type={type} />
            </IconContainer>
            <TextZeta color={color} isBold>
              {message}
            </TextZeta>
          </TextWrapper>
          <ActionIconWrapper>
            {undo ? (
              <ButtonSecondary
                text={undoText}
                icon={IconRefresh}
                onClick={undo}
              />
            ) : (
              <IconButton onClick={this.hide} icon={IconClose} type={type} />
            )}
          </ActionIconWrapper>
        </Container>
      </CSSTransition>
    );
  }
}

ToastContainer.propTypes = {
  delay: PropTypes.number,
  position: PropTypes.oneOf(["right", "center", "left"])
};

ToastContainer.defaultProps = {
  delay: 5000,
  position: "left"
};

const Icon = ({ type }) => {
  // TODO use proper icons when available
  switch (type) {
    case "alert":
      return <IconInfo fill={alert} />;
    case "success":
      return <IconInfo fill={success} />;
    case "info":
      return <IconInfo fill={warn} />;
    default:
      return <IconInfo fill={success} />;
  }
};
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  ${({ position }) => {
    switch (position) {
      case "right":
        return `right: 50px;`;
      case "center":
        return `
        left: 0; 
        right: 0; 
        margin-left: auto; 
        margin-right: auto;
        `;
      default:
        return `left: 50px;`;
    }
  }}
  bottom: -50px;
  background-color: ${({ bg }) => bg};
  width: 300px;
  border-radius: 4px;
  padding: 16px;
  box-shadow: ${shadow200};
  z-index: 2000;

  &.toast-enter {
    transform: translateY(-50px);
  }

  &.toast-enter-active,
  &.toast-enter-done {
    transition: all 100ms ease-in;
    transform: translateY(-150px);
  }

  &.toast-exit {
    transform: translateY(-150px);
  }

  &.toast-exit-active {
    transform: translateY(-50px);
    transition: all 100ms ease-out;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
`;

const ActionIconWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  ${BodyUI} {
    margin-left: 5px;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export default ToastContainer;
