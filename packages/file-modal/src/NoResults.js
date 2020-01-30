import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { msg } from "@happeokit/translations";
import messages from "./messages";
import { BodyUI, TextGamma } from "@happeokit/typography";
import { ASSETS_ROOT } from "./constants";
import { gray05 } from "@happeokit/colors";

/**
 *
 * NoResults
 *
 */
const NoResults = ({ title, subtitle, children }) => {
  return (
    <Container>
      <Img src={`${ASSETS_ROOT}/no-results.svg`} alt="Image" />
      <TextGamma>{title || msg(messages.noResultsTitle)}</TextGamma>
      {subtitle && (
        <SubtitleWrapper>
          <BodyUI color={gray05}>{subtitle}</BodyUI>
        </SubtitleWrapper>
      )}
      {children}
    </Container>
  );
};

NoResults.propTypes = {
  subtitle: PropTypes.node
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Img = styled.img`
  width: 300px;
`;

const SubtitleWrapper = styled.div`
  display: flex;
  text-align: center;
  max-width: 400px;
  padding: 16px 0;
`;
export default NoResults;
