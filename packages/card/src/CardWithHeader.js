import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { TextZeta, BodyUI } from "@happeouikit/typography";
import Card from "./Card";
import { screen } from "@happeouikit/theme";

const CardWithHeader = ({
  className,
  padding,
  header,
  children,
  subheader,
  ...rest
}) => {
  return (
    <Card className={className} padding="0" {...rest}>
      <CardHeader padding={padding}>
        <TextZeta>{header}</TextZeta>
        {subheader ? <Subheader>{subheader}</Subheader> : null}
      </CardHeader>
      <Container padding={padding} {...rest}>
        {children}
      </Container>
    </Card>
  );
};

CardWithHeader.propTypes = {
  header: PropTypes.node,
  padding: PropTypes.string,
  className: PropTypes.string
};

const CardHeader = styled.div`
  margin: 0;
  border-bottom: 1px solid #d8dbde;
  padding: ${({ padding }) => padding || "12px 32px"};

  @media ${screen.onlyXs} {
    display: none;
  }
`;

const Subheader = styled(BodyUI)`
  margin-top: 5px;
  font-size: 12px;
`;

const Container = styled.div`
  padding: ${({ padding }) => padding || "32px"};
  display: flex;
  align-items: flex-start;
  flex-direction: ${({ direction }) => direction || "row"};

  @media ${screen.onlyXs} {
    padding: 0;
  }
`;

export default CardWithHeader;
