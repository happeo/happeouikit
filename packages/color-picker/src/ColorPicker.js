import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ChromePicker } from "react-color";

/**
 *
 * ColorPicker
 *
 */
const ColorPicker = ({ show, color, handleClose, handleChange }) => {
  const pickerEl = useRef(null);

  const handleClick = e => {
    if (pickerEl.current && !pickerEl.current.contains(e.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    show && (
      <Container ref={pickerEl}>
        <Cover>
          <ChromePicker onChange={handleChange} color={color} />
        </Cover>
      </Container>
    )
  );
};

ColorPicker.propTypes = {
  color: PropTypes.string,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  handleChange: PropTypes.func
};

const Container = styled.div`
  position: absolute;
  z-index: 9;
`;

const Cover = styled.div`
  position: absolute;
`;

export default ColorPicker;
