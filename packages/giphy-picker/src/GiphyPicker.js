import React from "react";
import { IconGif } from "@happeokit/icons";
import TetherComponent from "react-tether";
import GiphyDrop from "./GiphyPickerDrop";
import { GiphyPickerContext } from "./context";
import { ButtonSecondary, IconButton } from "@happeokit/buttons";
import PropTypes from "prop-types";

export default class GiphyPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  togglePicker = event => {
    event && event.preventDefault();
    this.setState({ isOpen: !this.state.isOpen });
  };

  select = gif => {
    this.setState({ isOpen: false });
    this.props.onSelected && this.props.onSelected(gif);
  };

  getButton = () => {
    if (this.props.text)
      return (
        <ButtonSecondary
          text={this.props.text}
          icon={IconGif}
          onClick={this.togglePicker}
          disabled={this.props.disabled}
        />
      );
    return (
      <IconButton
        icon={IconGif}
        onClick={this.togglePicker}
        disabled={this.props.disabled}
      />
    );
  };

  render = () => {
    const { isOpen } = this.state;
    return (
      <TetherComponent
        ref={this.dropDownRef}
        style={{ zIndex: "1501" }}
        attachment="top center"
        constraints={[
          {
            to: "window",
            attachment: "together",
            pin: ["left", "right"]
          }
        ]}
        remove={true}
        targetAttachment="bottom center"
        classPrefix="giphyDrop"
        /* renderTarget: This is what the item will be tethered to, make sure to attach the ref */
        renderTarget={ref => <span ref={ref}>{this.getButton()}</span>}
        /* renderElement: If present, this item will be tethered to the the component returned by renderTarget */
        renderElement={ref =>
          isOpen && (
            <GiphyPickerContext.Provider value={this.select}>
              <GiphyDrop ref={ref} onClose={this.togglePicker} />
            </GiphyPickerContext.Provider>
          )
        }
      />
    );
  };
}
GiphyPicker.propTypes = {
  onSelected: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};
