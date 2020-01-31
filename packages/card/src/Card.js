import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { bgWhite } from "@happeouikit/colors";
import { screen } from "@happeouikit/theme/";

const Container = styled.div`
  border-radius: 6px;
  background-color: ${bgWhite};
  padding: ${({ padding }) => padding};
  box-shadow: 0 1px 4px 0 rgba(186, 198, 208, 0.5),
    0 1px 4px 0 rgba(0, 157, 255, 0.05);
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  margin: ${({ margin }) => margin};
  position: relative;

  @media ${screen.onlyXs} {
    box-shadow: none;
  }
`;

const Card = ({ className, children, ...rest }) => {
  return (
    <Container className={className} {...rest}>
      {children}
    </Container>
  );
};

Card.propTypes = {
  padding: PropTypes.string,
  fullWidth: PropTypes.bool,
  margin: PropTypes.string
};

Card.defaultProps = {
  fullWidth: true,
  padding: "24px",
  margin: "0"
};

export default Card;
