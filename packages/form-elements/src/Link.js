import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { BodyUI } from "@happeouikit/typography";
import { active } from "@happeouikit/colors";

export const Link = props => {
  return (
    <StyledLink as="a" {...props}>
      {props.children}
    </StyledLink>
  );
};

export const LinkExternal = props => {
  return (
    <StyledLink as="a" target="_blank" rel="nofollow noopener" {...props}>
      {props.children}
    </StyledLink>
  );
};

const StyledLink = styled(BodyUI)`
  text-decoration: ${({ underline }) => (underline ? "underline" : "none")};
  color: ${({ color }) => color || active};

  :hover {
    color: ${({ hoverColor }) => hoverColor || active};
    text-decoration: underline;
  }
`;

Link.propTypes = {
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  underline: PropTypes.bool,
  children: PropTypes.node
};

Link.defaultProps = {
  color: active,
  hoverColor: active,
  underline: false
};
