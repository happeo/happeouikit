import React from "react";
import styled from "styled-components";
import moment from "moment";
import { BodyUI, TinyText } from "@happeokit/typography";
import { active, gray05, toBgLight } from "@happeokit/colors";
import { FormattedMessage } from "react-intl";
import { time } from "@universe/frontend-utils";
import messages from "./messages";
import * as file from "./file";

const DriveItem = ({ item, state, handleItemClick }) => {
  let clickTimeout = null;
  let text = messages.modified;
  let timeField = "modifiedTime";
  let imageField = "iconLink";

  if (file.isTeamDrive(item)) {
    text = messages.created;
    timeField = "createdTime";
    imageField = "backgroundImageLink";
  }

  const date = moment(time.timeStampToDate(item[timeField].value)).format("L");

  const handleClicks = () => {
    if (clickTimeout !== null) {
      handleItemClick(item, true);
      clearTimeout(clickTimeout);
      clickTimeout = null;
    } else {
      clickTimeout = setTimeout(() => {
        handleItemClick(item);
        clearTimeout(clickTimeout);
        clickTimeout = null;
      }, 200);
    }
  };

  return (
    <FileContainer
      onClick={handleClicks}
      isActive={state.selectedItem && state.selectedItem.id === item.id}
    >
      <FileIcon src={item[imageField]} />
      <FileInner>
        <BodyUI>{item.name}</BodyUI>
        <TinyText color={gray05}>
          <FormattedMessage {...text} values={{ date }} />
        </TinyText>
      </FileInner>
    </FileContainer>
  );
};

const FileContainer = styled.li`
  display: flex;
  align-items: center;
  padding: 8px;
  user-select: none;

  :hover {
    cursor: pointer;
    background: ${toBgLight(active)};
  }

  ${({ isActive }) =>
    isActive &&
    `background: ${toBgLight(active)};
  `}
`;

const FileInner = styled.div`
  display: flex;
  flex-direction: column;
`;

const FileIcon = styled.img`
  flex-shrink: 0;
  margin-right: 8px;
  width: 16px;
  height: 16px;
  border-radius: 2px;
`;

DriveItem.defaultProps = {
  onClick: () => ""
};

export default DriveItem;
