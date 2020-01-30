import React from "react";
import styled from "styled-components";

const BaseEmbed = ({ src, ...rest }) => {
  return (
    <Iframe
      src={src}
      allowFullScreen
      referrerPolicy="origin"
      frameBorder="0"
      {...rest}
    />
  );
};

const Iframe = styled.iframe`
  border: none;
`;

BaseEmbed.defaultProps = {
  src: ""
};

export default BaseEmbed;
