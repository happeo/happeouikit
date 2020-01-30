import React from "react";
import styled from "styled-components";
import { MAP_MIME_TYPES_TO_ICONS, default as FileIcon } from "./FileIcon";

export const IconList = () => {
  return Object.keys(MAP_MIME_TYPES_TO_ICONS).map(key => {
    return (
      <Container key={key}>
        <FileIcon mimeType={key} />
        <Key>{key}</Key>
      </Container>
    );
  });
};

const Key = styled.span`
  margin-left: 40px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;

  svg {
    font-size: 28px;
  }
`;
