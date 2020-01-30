import * as actions from "./actionTypes";
import { TABS } from "./constants";

export const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case actions.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: payload,
        error: false,
        selectedItem: null,
        searching: false,
        expandedItem:
          payload === TABS.MY_DRIVE ? state.myDriveTree : state.teamDriveTree,
        hasMore:
          payload === TABS.MY_DRIVE
            ? state.myDriveTree.children.length === 0 ||
              !!state.myDriveTree.nextPageToken
            : state.teamDriveTree.children.length === 0 ||
              !!state.teamDriveTree.nextPageToken
      };
    case actions.LOAD_BEGIN:
      return { ...state, loading: true, error: false };
    case actions.LOAD_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        hasMore: false
      };
    case actions.SET_MY_DRIVE_FILES:
      return {
        ...state,
        myDriveTree: payload,
        hasMore: !!state.expandedItem.nextPageToken,
        loading: false
      };
    case actions.SET_TEAM_DRIVES:
      return {
        ...state,
        teamDriveTree: payload,
        hasMore: !!state.expandedItem.nextPageToken,
        loading: false
      };
    case actions.SET_SEARCH_TREE:
      return {
        ...state,
        searchTree: payload,
        hasMore: !!state.expandedItem.nextPageToken,
        loading: false
      };
    case actions.SET_EXPANDED_ITEM:
      return {
        ...state,
        expandedItem: payload,
        selectedItem: null,
        hasMore: payload.children.length === 0 || !!payload.nextPageToken
      };
    case actions.SET_SELECTED_ITEM:
      return { ...state, selectedItem: payload };
    case actions.SET_DB_CLICK_SELECT:
      return { ...state, isDoubleClick: payload, backNavigation: false };
    case actions.SET_SEARCHING:
      // remove item as selected and expanded when search is done
      return {
        ...state,
        searching: payload,
        selectedItem: null,
        hasMore: false,
        expandedItem: payload
          ? state.searchTree
          : state.activeTab === TABS.MY_DRIVE
          ? state.myDriveTree
          : state.teamDriveTree
      };
    case actions.SET_BACK_NAVIGATION:
      return {
        ...state,
        backNavigation: true,
        isDoubleClick: false
      };
    default:
      return state;
  }
};
