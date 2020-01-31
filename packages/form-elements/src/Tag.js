import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { white, active } from "@happeouikit/colors";
import { IconClose } from "@happeouikit/icons";
import { BodyUI } from "@happeouikit/typography";

const Tag = ({ text, closeCallback, isUppercase, ...props }) => {
  const [show, setShow] = useState(true);

  const onClick = () => {
    setShow(false);
    closeCallback && closeCallback();
  };

  return (
    show && (
      <TagWrapper {...props}>
        <Text bold uppercase={isUppercase}>
          {text}
        </Text>
        <IconWrapper onClick={onClick}>
          <IconClose width="16px" height="16px" />
        </IconWrapper>
      </TagWrapper>
    )
  );
};

Tag.propTypes = {
  text: PropTypes.node.isRequired,
  closeCallback: PropTypes.func,
  isUppercase: PropTypes.bool
};

const TagWrapper = styled.div`
  display: inline;
  background: ${active};
  height: 24px;
  width: auto;
  border-radius: 100px;
`;
const IconWrapper = styled.span`
  display: inline-block;
  position: relative;
  right: 5px;
  fill: ${white};
  cursor: pointer;
  padding-right: 10px;
`;
const Text = styled(BodyUI)`
  display: inline-block;
  position: relative;
  padding: 2px 11.6px 2px 10px;
  bottom: 3px;
  color: ${white};
`;

export default Tag;
