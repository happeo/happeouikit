import React, { Fragment } from "react";
import styled from "styled-components";
import { BodyUI } from "@happeokit/typography";
import { msg } from "@happeokit/translations";
import messages from "./messages";
import { ErrorMessage } from "@happeokit/alerts";
import { BackButton, DriveItem } from "./index";
import * as file from "./file";
import { MODAL_TYPES } from "./constants";

const DriveItemList = ({
  items,
  state,
  dispatch,
  allowedType,
  canSelectTeamDrive,
  handleItemClick
}) => {
  if (state.error) return <ErrorMessage />;
  let renderedItems = [];
  let item = {};

  const activeItem = state.expandedItem;
  if (!activeItem) {
    renderedItems = items;
  } else if (
    file.isSelectable(
      state.selectedItem,
      allowedType,
      canSelectTeamDrive,
      state.isDoubleClick
    )
  ) {
    const { parent } = state.selectedItem;
    renderedItems = parent ? parent.children : items;
  } else {
    item = file.findItemInArray(activeItem.id, items);
    if (item && item.children) {
      renderedItems = item.children;
    } else {
      renderedItems = items;
    }
  }

  // Display only items of allowed types plus folders and drives
  renderedItems = renderedItems.filter(item => {
    return (
      allowedType === MODAL_TYPES.all ||
      file.getFileType(item) === allowedType ||
      file.isFolder(item) ||
      file.isTeamDrive(item)
    );
  });

  return (
    <Fragment>
      <BackButton item={activeItem} state={state} dispatch={dispatch} />

      <BodyUI bold style={{ width: "100%" }}>
        {msg(messages.name)}
      </BodyUI>
      <ItemList>
        {renderedItems.map(child => (
          <DriveItem
            key={child.id}
            item={child}
            state={state}
            handleItemClick={handleItemClick}
            allowedType={allowedType}
          />
        ))}
      </ItemList>
    </Fragment>
  );
};

const ItemList = styled.ul`
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 8px 0;
  margin: 0;
  width: 100%;
`;

export default DriveItemList;
