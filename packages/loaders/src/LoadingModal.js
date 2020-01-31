/**
 *
 * Default Loader component
 *
 */
import React from "react";
import PropTypes from "prop-types";

import { Modal } from "@happeouikit/modal";
import LoadingContainer from "./LoadingContainer";

const LoadingModal = ({ isOpen, title, description, state }) => (
  <Modal isOpen={isOpen} footer={false} iconClose={false}>
    <LoadingContainer title={title} description={description} state={state} />
  </Modal>
);

LoadingModal.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  state: PropTypes.oneOf(["loading", "success", "error"])
};

LoadingModal.defaultProps = {
  isOpen: true,
  title: "Title is missing",
  state: "loading"
};

export default LoadingModal;
