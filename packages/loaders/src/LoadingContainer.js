/**
 *
 * Default Loader component
 *
 */
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { gray04 } from "@happeouikit/colors";
import { Spacer } from "@happeouikit/layout";
import { TextGamma, BodyUI } from "@happeouikit/typography";

import Spinner from "./Spinner";

const LoadingContainer = ({ title, description, state }) => (
  <Container>
    <Spinner state={state} />
    <Spacer height={"24px"} />
    <TextGamma>{title}</TextGamma>
    {!!description && (
      <Fragment>
        <Spacer />
        <BodyUI color={gray04}>{description}</BodyUI>
      </Fragment>
    )}
  </Container>
);

LoadingContainer.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  state: PropTypes.oneOf(["loading", "success", "error"])
};

LoadingContainer.defaultProps = {
  title: "Title is missing",
  state: "loading"
};

const Container = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
export default LoadingContainer;
