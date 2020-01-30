import React from "react";
import styled from "styled-components";
import { IconArrowBack } from "@happeokit/icons";
import { TextZeta } from "@happeokit/typography";
import * as file from "./file";
import { toBgLight, active } from "@happeokit/colors";
import { setExpandedItem, setBackNavigation } from "./actions";

const BackButton = ({ dispatch, state }) => {
  const { isBackNavigation, expandedItem } = state;

  if (!expandedItem || expandedItem.id === "root") return null;

  let text = "";

  if (file.isFolder(expandedItem) || file.isTeamDrive(expandedItem)) {
    text = !isBackNavigation
      ? expandedItem.name
      : expandedItem.parent && expandedItem.parent.name;
  } else if (file.isFile(expandedItem) && expandedItem.parent) {
    text = expandedItem.parent.name;
  }

  const goBack = () => {
    dispatch(setExpandedItem(expandedItem.parent));
    dispatch(setBackNavigation(true));
  };

  return (
    <Container onClick={goBack}>
      <IconArrowBack />
      <TextZeta>{text}</TextZeta>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;

  :hover {
    background: ${toBgLight(active)};
    cursor: pointer;
  }

  svg {
    margin-right: 8px;
  }
`;

export default BackButton;
