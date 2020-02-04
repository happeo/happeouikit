import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { IconButton, ButtonSecondary } from "@happeouikit/buttons";
import { IconFilter } from "@happeouikit/icons";
import { Checkbox } from "@happeouikit/form-elements";
import { Container, ActionRow } from "./styles";
import { active, toBgLight, white } from "@happeouikit/colors";
import { sansFamily } from "@happeouikit/typography";

/**
 *
 * FilterMenu
 * Menu with checkbox actions
 *
 */
class FilterMenu extends PureComponent {
  static propTypes = {
    // TODO: add format of the aciton
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        callback: PropTypes.func.isRequired,
        type: PropTypes.string.isRequired
      })
    ).isRequired,
    menuPosition: PropTypes.string,
    initialChecked: PropTypes.bool,
    icon: PropTypes.func,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    selected: PropTypes.array
  };

  static defaultProps = {
    menuPosition: "left",
    initialChecked: false,
    icon: IconFilter,
    selected: []
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      values: props.selected
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    const { initialChecked, actions } = this.props;
    // If initialChecked is true, add all the values to the state thus marking
    // them as checked in checkboxes
    if (initialChecked) {
      const values = actions.map(val => val.type);
      this.setState({ values });
    }
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

  /**
   * Set checked value on the state and pass them to callback
   * @param value
   * @param {Function} cb - callback function
   */
  changeValue = (value, cb) => {
    const { values } = this.state;
    let vals;
    if (values.includes(value)) {
      vals = values.filter(v => v !== value);
    } else {
      vals = [...values, value];
    }

    this.setState({ values: vals });
    cb(vals);
  };

  render() {
    const { open, values } = this.state;
    const { actions, menuPosition, text } = this.props;
    const Icon = this.props.icon;
    const numSelected = values.length;
    return (
      <Wrapper ref={node => (this.wrapperRef = node)} isActive={numSelected}>
        {text ? (
          <ButtonSecondary
            icon={() => <Icon width="20px" height="20px" />}
            onClick={this.toggleMenu}
            text={text}
          />
        ) : (
          <IconButton
            icon={() => <Icon width="20px" height="20px" />}
            onClick={this.toggleMenu}
          />
        )}
        {numSelected ? <Indicator>{numSelected}</Indicator> : null}
        {open && (
          <Container tabindex={0} menuPosition={menuPosition}>
            {actions.map((action, i) => (
              <ActionRow key={i}>
                <Checkbox
                  checked={values.includes(action.type)}
                  onChange={() =>
                    this.changeValue(action.type, action.callback)
                  }
                  label={action.name}
                />
              </ActionRow>
            ))}
          </Container>
        )}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  position: relative;

  button {
    ${({ isActive }) => {
      if (isActive) {
        return `
       background: ${toBgLight(active)};
       fill: ${active}
      `;
      }
    }}
  }
`;

const Indicator = styled.span`
  font-family: ${sansFamily};
  background: ${active};
  color: ${white};
  position: absolute;
  right: -7px;
  border-radius: 50px;
  font-size: 12px;
  padding: 3px 5px;
  top: -6px;
  display: block;
  width: 10px;
  text-align: center;
  letter-spacing: -1px;
`;

export default FilterMenu;
