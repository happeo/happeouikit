import React, { Component } from "react";
import PropTypes from "prop-types";
import { IconButton } from "@happeouikit/buttons";
import { IconMoreVert } from "@happeouikit/icons";
import { BodyUI } from "@happeouikit/typography";
import { Container, Wrapper, ActionRow } from "./styles";

/**
 *
 * ActionsMenu
 *
 */
class ActionsMenu extends Component {
  static propTypes = {
    actions: PropTypes.array.isRequired,
    menuPosition: PropTypes.string
  };

  static defaultProps = {
    menuPosition: "left"
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = e => {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      this.setState({ open: false });
    }
  };

  toggleMenu = () => {
    this.setState({ open: !this.state.open });
  };

  // Execute callback and close the menu
  close = cb => {
    cb();
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const { actions, menuPosition } = this.props;
    return (
      <Wrapper ref={node => (this.wrapperRef = node)}>
        <IconButton
          isActionIcon
          icon={() => <IconMoreVert width="20px" height="20px" />}
          onClick={this.toggleMenu}
        />
        {open && (
          <Container menuPosition={menuPosition}>
            {actions.map((action, i) => (
              <ActionRow key={i} onClick={() => this.close(action.callback)}>
                <BodyUI>{action.name}</BodyUI>
              </ActionRow>
            ))}
          </Container>
        )}
      </Wrapper>
    );
  }
}

export default ActionsMenu;
