import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import messages from "../messages";
import { Modal } from "@happeokit/modal";
import { msg } from "@happeokit/translations";
import { Input, Checkbox } from "@happeokit/form-elements";
import { MODAL_EVENTS } from "../constants";
import { api } from "@universe/frontend-utils";
import { Loader } from "@happeokit/loaders";
import { BodyUI } from "@happeokit/typography";
import { gray04, gray06 } from "@happeokit/colors";
import {
  IconPage,
  IconPagegroup,
  IconHidden,
  IconArrowDropUp,
  IconArrowDropDown,
  IconLink
} from "@happeokit/icons";
import { IconButton, ButtonPrimary, ButtonSecondary } from "@happeokit/buttons";
import { page } from "@universe/frontend-utils";
import { validateUrl } from "@universe/frontend-utils/src";

const PageLinkModal = ({ isOpen, close }) => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [expanded, setExpanded] = useState([]);
  const [link, setLink] = useState({
    url: "https://",
    id: null,
    collectionId: null,
    target: false
  });

  useEffect(() => {
    if (isOpen) {
      // Prevent background scroll when modal is open
      document.body.style.overflow = "hidden";
      listCollections();
    } else {
      document.body.style.overflow = "initial";
    }
  }, [isOpen]);

  const listCollections = async () => {
    try {
      const resp = await api.pages.listCollections();
      setCollections(resp.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  const onEmbedClose = () => {
    setError(false);
    if (!validateUrl(link.url)) {
      setError(true);
    } else {
      const event = new CustomEvent(MODAL_EVENTS.LINK_CLOSE, {
        bubbles: true,
        detail: { data: link }
      });
      return window.dispatchEvent(event);
    }
  };

  const selectCollection = (collection, parent) => {
    setError(false);
    const pageLink = page.getUrl(collection, parent);

    setLink({
      ...link,
      url: "https://" + window.location.host + pageLink,
      collectionId: parent ? parent.id : collection.id,
      id: collection.id
    });
  };

  const setValue = e => {
    setError(false);
    const { value } = e.target;
    setLink({ ...link, url: value });
  };

  const toggleTarget = e => {
    const { checked } = e.target;
    setLink({ ...link, target: checked });
  };

  const toggleExpanded = collection => {
    let newExpanded = [];
    if (expanded.includes(collection)) {
      newExpanded = expanded.filter(col => col.id !== collection.id);
    } else {
      newExpanded = [...expanded, collection];
    }

    setExpanded(newExpanded);
  };

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      headerText={msg(messages.addLink)}
      footer={false}
      width="400px"
    >
      <ModalContent>
        <Input
          type="text"
          value={link.url}
          onChange={setValue}
          label={msg(messages.webPage)}
          state={error && "error"}
          errorMessage={msg(messages.invalidUrl)}
        />
        <Divider>
          <BodyUI>{msg(messages.or)}</BodyUI>
        </Divider>
        <BodyUI>{msg(messages.internal)}</BodyUI>
        <LinkContainer>
          {loading ? (
            <Loader />
          ) : (
            collections.map(collection => (
              <Fragment key={collection.id + collection.name}>
                <RootCollection
                  collection={collection}
                  selectCollection={selectCollection}
                  isExpanded={expanded.includes(collection)}
                  toggleExpanded={() => toggleExpanded(collection)}
                />
                {collection.navigation && collection.navigation.links && (
                  <Collections
                    parent={collection}
                    isExpanded={expanded.includes(collection)}
                    collections={collection.navigation.links}
                    selectCollection={selectCollection}
                  />
                )}
              </Fragment>
            ))
          )}
        </LinkContainer>
      </ModalContent>
      <ModalFooter>
        <Checkbox
          label={msg(messages.newTab)}
          checked={link.target}
          onChange={toggleTarget}
        />
        <ButtonRow>
          <ButtonSecondary text={msg(messages.cancel)} onClick={close} />
          <ButtonPrimary text={msg(messages.save)} onClick={onEmbedClose} />
        </ButtonRow>
      </ModalFooter>
    </Modal>
  );
};

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonRow = styled.div`
  display: flex;
  margin-top: 24px;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow: auto;
`;

const Divider = styled.div`
  display: flex;
  text-align: center;
  width: 100%;
  justify-content: center;
  position: relative;
  padding: 16px 0;

  ::after {
    content: " ";
    position: absolute;
    left: 1em;
    right: 1em;
    height: 1px;
    top: 25px;
    background-color: ${gray06};
  }

  ${BodyUI} {
    color: ${gray06};
    text-transform: uppercase;
    background-color: #fff;
    position: relative;
    z-index: 1;
    padding: 0 10px;
  }
`;

const Collections = ({ collections, level = 0, ...props }) => {
  level++;
  return collections.map(collection => {
    const { subPages } = collection;

    return (
      <Fragment key={collection.id + collection.name}>
        <Collection level={level} collection={collection} {...props} />
        {subPages && !!subPages.length && (
          <Collections collections={subPages} level={level} {...props} />
        )}
      </Fragment>
    );
  });
};

const RootCollection = ({
  collection,
  selectCollection,
  toggleExpanded,
  isExpanded
}) => {
  return (
    <Container>
      <Inner>
        <IconPagegroup fill={gray04} />
        <BodyUI onClick={() => selectCollection(collection)}>
          {collection.name}
        </BodyUI>
      </Inner>

      <IconButton
        isActionIcon
        icon={isExpanded ? IconArrowDropDown : IconArrowDropUp}
        onClick={() => toggleExpanded(collection.parent)}
      />
    </Container>
  );
};

const Collection = ({
  isExpanded,
  collection,
  selectCollection,
  level,
  parent
}) => {
  return (
    <Container isVisible={isExpanded}>
      <Inner>
        <Padding level={level} />
        {collection.type === "hyperlink" ? (
          <IconLink style={{ fill: gray04, fontSize: "18px" }} />
        ) : (
          <IconPage fill={gray04} />
        )}
        <BodyUI onClick={() => selectCollection(collection, parent)}>
          {collection.name}
        </BodyUI>
      </Inner>
      {collection.draft && <IconHidden fill={gray04} />}
    </Container>
  );
};

const Container = styled.div`
  display: ${({ isVisible = true }) => (isVisible ? "flex" : "none")};
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid ${gray06};

  ${BodyUI}:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  svg {
    padding-right: 8px;
    flex-shrink: 0;
  }
`;
const Padding = styled.div`
  width: ${({ level }) => level * 12 + "px"};
`;
export default PageLinkModal;
