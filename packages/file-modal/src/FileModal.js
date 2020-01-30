import React, { useReducer } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import messages from "./messages";
import { msg } from "@happeokit/translations";
import { Modal } from "@happeokit/modal";
import { ButtonSecondary, ButtonPrimary } from "@happeokit/buttons";
import { gray07, gray05, active } from "@happeokit/colors";
import { TextZeta } from "@happeokit/typography";
import { api } from "@universe/frontend-utils";
import { MODAL_TYPES, TABS, PAGE_SIZE } from "./constants";
import { Spacer } from "@happeokit/layout";
import { DriveItemList, Search } from "./index";
import * as file from "./file";
import { toast } from "@happeokit/toast";
import debounce from "lodash.debounce";
import { reducer } from "./reducer";
import * as actions from "./actions";
import InfiniteScroll from "react-infinite-scroller";
import { Loader } from "@happeokit/loaders";
import { NoResults } from "./index";

const childQuery = parent => `'${parent}' in parents and trashed = false`;

const FileModal = ({
  modalOpen,
  close,
  onSave,
  canSelectTeamDrive,
  allowedType
}) => {
  const initialState = {
    activeTab: TABS.MY_DRIVE,
    myDriveTree: { id: "root", nextPageToken: null, children: [] },
    teamDriveTree: { id: "root", nextPageToken: null, children: [] },
    searchTree: { id: "root", nextPageToken: null, children: [] },
    selectedItem: null,
    error: false,
    hasMore: true,
    loading: false,
    searching: false
  };
  initialState.expandedItem = initialState.myDriveTree;

  const [state, dispatch] = useReducer(reducer, initialState, state => state);

  const getItems = () => {
    if (state.loading) return;

    if (state.searching && state.expandedItem.id === "root")
      return doSearch(state.searching, true);

    if (isActiveTab(TABS.MY_DRIVE)) getMyDrive();
    else getTeamDrives();
  };

  /**
   * Get user's My Drive items
   * @returns {Promise<void>}
   */
  const getMyDrive = async () => {
    dispatch(actions.loadBegin());
    const { expandedItem } = state;
    try {
      const resp = await api.fileService.listDriveFiles({
        q: childQuery(expandedItem.id),
        orderBy: "folder",
        pageSize: PAGE_SIZE,
        pageToken: expandedItem.nextPageToken
      });

      const updatedTree = updateTree(
        state.searching ? state.searchTree : state.myDriveTree,
        expandedItem,
        resp.data.files,
        resp.data.nextPageToken
      );
      state.searching
        ? dispatch(actions.setSearchTree(updatedTree))
        : dispatch(actions.setMyDriveFiles(updatedTree));
    } catch (e) {
      console.error(e);
      dispatch(actions.loadError());
    }
  };

  const updateTree = (tree, target, children, nextPageToken) => {
    if (!tree.children) tree.children = [];

    if (tree.id === target.id) {
      children.forEach(c => (c.parent = tree));
      tree.children = _.unionBy(tree.children, children, "id");
      tree.nextPageToken = nextPageToken;
      return tree;
    }

    tree.children = tree.children.map(t =>
      updateTree(t, target, children, nextPageToken)
    );
    return tree;
  };

  /**
   * List team drives at the root level
   * @returns {Promise<void>}
   */
  const getTeamDrives = async () => {
    dispatch(actions.loadBegin());
    try {
      const { expandedItem } = state;
      let resp = null;
      if (expandedItem.id === "root")
        resp = await api.fileService.listTeamDrives({
          q: childQuery(expandedItem.id),
          orderBy: "folder",
          pageSize: PAGE_SIZE,
          pageToken: expandedItem.nextPageToken
        });
      else
        resp = await api.fileService.listDriveFiles({
          q: childQuery(expandedItem.id),
          orderBy: "folder",
          pageSize: PAGE_SIZE,
          pageToken: expandedItem.nextPageToken
        });
      const updatedTree = updateTree(
        state.teamDriveTree,
        expandedItem,
        resp.data.teamDrives || resp.data.files,
        resp.data.nextPageToken
      );
      dispatch(actions.setTeamDrives(updatedTree));
    } catch (e) {
      console.error(e);
      dispatch(actions.loadError());
    }
  };

  const isActiveTab = tab => state.activeTab === tab;

  /**
   * Set item as selected, i.e. if it's a folder, list it's children, if it's a
   * file, highlight it and enable saving
   * @param item
   * @param isDoubleClick
   * @returns {Promise<void>|void}
   */
  const handleItemClick = (item, isDoubleClick = false) => {
    dispatch(actions.setDbClickSelect(isDoubleClick));

    const isSelectable = file.isSelectable(
      item,
      allowedType,
      canSelectTeamDrive,
      isDoubleClick
    );

    if (!item.children) item.children = [];

    if (isSelectable) {
      dispatch(actions.setSelectedItem(item));
      return;
    }

    // If item cannot be selected and it was a single click, do nothing
    if (!isSelectable && !isDoubleClick) return;
    dispatch(actions.setExpandedItem(item));
  };

  const switchTab = tab => {
    dispatch(actions.setActiveTab(tab));
  };

  /**
   * Save selected file and close the modal/clear state
   * @returns {Promise<void>}
   */
  const saveSelected = async () => {
    if (!state.selectedItem) return;
    dispatch(actions.setActiveTab(TABS.MY_DRIVE));
    onSave(state.selectedItem);
  };

  /**
   * Reset current state and close the modal
   */
  const closeModal = () => {
    dispatch(actions.setActiveTab(TABS.MY_DRIVE));
    close();
  };

  /**
   * Search all drives by item's name
   * @param value
   * @returns {Promise<void>}
   */
  const doSearch = async (value, loadMore) => {
    if (!value) {
      dispatch(actions.setSearching(false));
      return isActiveTab(TABS.MY_DRIVE)
        ? switchTab(TABS.MY_DRIVE)
        : switchTab(TABS.TEAM_DRIVES);
    }
    try {
      dispatch(actions.loadBegin());
      dispatch(actions.setSearching(value));
      const params = {
        corpora: "allTeamDrives,user",
        q: `name contains '${value}' and trashed = false`,
        pageSize: PAGE_SIZE,
        orderBy: "folder",
        pageToken: loadMore && state.searchTree.nextPageToken
      };
      const resp = await api.fileService.listDriveFiles(params);
      const { files, nextPageToken } = resp.data;

      if (loadMore) {
        const updatedTree = updateTree(
          state.searchTree,
          state.expandedItem,
          files,
          nextPageToken
        );
        dispatch(actions.setSearchTree(updatedTree));
      } else {
        files.forEach(f => (f.parent = state.searchTree));
        state.searchTree.children = files;
        state.searchTree.nextPageToken = nextPageToken;
        dispatch(actions.setSearchTree(state.searchTree));
      }
    } catch (e) {
      console.error(e);
      toast.error({ message: msg(messages.searchError) });
    }
  };

  const debouncedDoSearch = debounce(doSearch, 300);
  const items = state.expandedItem.children || [];
  return (
    <Modal
      isOpen={modalOpen}
      close={closeModal}
      headerText={msg(messages.fileManager)}
      footer={false}
      width="400px"
      top="20%"
    >
      <Navigation>
        <TabGroup>
          <NavTab
            onClick={() => switchTab(TABS.MY_DRIVE)}
            isActive={isActiveTab(TABS.MY_DRIVE)}
          >
            <TextZeta color="inherit">{msg(messages.myDrive)}</TextZeta>
          </NavTab>
          <NavTab
            onClick={() => switchTab(TABS.TEAM_DRIVES)}
            isActive={isActiveTab(TABS.TEAM_DRIVES)}
          >
            <TextZeta color="inherit">{msg(messages.teamDrives)}</TextZeta>
          </NavTab>
        </TabGroup>
      </Navigation>
      <Search getValue={debouncedDoSearch} placeholder={messages.searchDrive} />
      <Spacer />
      <div style={{ overflowY: "auto", height: "250px" }}>
        <InfiniteScroll
          style={{
            display: "flex",
            flexWrap: "wrap",
            maxHeight: "100%"
          }}
          pageStart={0}
          loadMore={getItems}
          hasMore={state.hasMore}
          useWindow={false}
          loader={<Loader key={0} />}
        >
          <DriveItemList
            state={state}
            dispatch={dispatch}
            items={items}
            allowedType={allowedType}
            canSelectTeamDrive={canSelectTeamDrive}
            handleItemClick={handleItemClick}
          />
        </InfiniteScroll>
        {!items.length && !state.loading && (
          <NoResultsWrapper>
            <NoResults />
          </NoResultsWrapper>
        )}
      </div>
      <ModalFooter>
        <ButtonSecondary text={msg(messages.cancel)} onClick={closeModal} />
        <ButtonPrimary
          text={msg(messages.select)}
          onClick={saveSelected}
          disabled={state.selectedItem === null}
        />
      </ModalFooter>
    </Modal>
  );
};

FileModal.propTypes = {
  modalOpen: PropTypes.bool,
  close: PropTypes.func,
  onSave: PropTypes.func,
  allowedType: PropTypes.oneOf(Object.keys(MODAL_TYPES)),
  canSelectTeamDrive: PropTypes.bool
};

FileModal.defaultProps = {
  allowedType: "all",
  canSelectTeamDrive: true
};

const Navigation = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  border-bottom: 1px solid ${gray07};
`;

const TabGroup = styled.div`
  display: flex;
`;

const NavTab = styled.div`
  color: ${gray05};
  text-decoration: none;
  padding-bottom: 8px;
  cursor: pointer;

  ${({ isActive }) => {
    return (
      isActive &&
      `color: ${active};
  padding-bottom: 4px;
  border-bottom: 4px solid ${active};`
    );
  }}

  &:hover {
    color: ${active};
    padding-bottom: 4px;
    border-bottom: 4px solid ${active};
  }

  &:not(:first-child) {
    margin-left: 20px;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 24px;
  width: 100%;

  button {
    margin-left: 16px;
  }
`;

const NoResultsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: auto;
  }
`;
export default FileModal;
