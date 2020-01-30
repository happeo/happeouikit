import * as actions from "./actionTypes";

export const setActiveTab = payload => ({
  type: actions.SET_ACTIVE_TAB,
  payload
});

export const setMyDriveFiles = payload => ({
  type: actions.SET_MY_DRIVE_FILES,
  payload
});

export const setSearchTree = payload => ({
  type: actions.SET_SEARCH_TREE,
  payload
});

export const setSelectedItem = payload => ({
  type: actions.SET_SELECTED_ITEM,
  payload
});

export const setExpandedItem = payload => ({
  type: actions.SET_EXPANDED_ITEM,
  payload
});

export const loadBegin = () => ({ type: actions.LOAD_BEGIN });
export const loadError = () => ({ type: actions.LOAD_ERROR });
export const setTeamDrives = payload => ({
  type: actions.SET_TEAM_DRIVES,
  payload
});

export const setDbClickSelect = payload => ({
  type: actions.SET_DB_CLICK_SELECT,
  payload
});

export const setSearching = payload => ({
  type: actions.SET_SEARCHING,
  payload
});

export const setBackNavigation = payload => ({
  type: actions.SET_BACK_NAVIGATION,
  payload
});
