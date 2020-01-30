import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "@happeokit/modal";
import { msg } from "@happeokit/translations";
import messages from "../messages";
import { Input, Textarea } from "@happeokit/form-elements";
import { TextZeta, BodyUI } from "@happeokit/typography";
import { active, gray05, gray07, alert } from "@happeokit/colors";
import EmbedService from "../EmbedService";
import { MODAL_EVENTS } from "../constants";
import { injectIntl } from "react-intl";

const embedService = new EmbedService();

const EmbedModal = ({ isOpen, close, intl }) => {
  const [embedValue, setEmbedValue] = useState("");
  const [activeTab, setActiveTab] = useState("code");
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewEmbed, setPreviewEmbed] = useState("");
  const [previewError, setPreviewError] = useState(null);
  const onEmbedClose = () => {
    const event = new CustomEvent(MODAL_EVENTS.EMBED_CLOSE, {
      bubbles: true,
      detail: { data: previewEmbed }
    });
    return window.dispatchEvent(event);
  };

  const setValue = async (e, type) => {
    const { value } = e.target;
    setEmbedValue(value);
    setPreviewError(false);
    try {
      setPreviewLoading(true);
      const embedHtml = await embedService.getEmbedHtml(value, type);
      if (embedHtml) setPreviewEmbed(embedHtml);
    } catch (e) {
      console.error(e);
      setPreviewError(true);
    } finally {
      setPreviewLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      okCallback={onEmbedClose}
      cancelText={msg(messages.cancel)}
      okText={msg(messages.select)}
      headerText={msg(messages.embedContent)}
      width="400px"
    >
      <ModalContent>
        <Navigation>
          <TabGroup>
            <NavTab
              onClick={() => setActiveTab("code")}
              isActive={activeTab === "code"}
            >
              <TextZeta color="inherit">{msg(messages.embed)}</TextZeta>
            </NavTab>
            <NavTab
              onClick={() => setActiveTab("link")}
              isActive={activeTab === "link"}
            >
              <TextZeta color="inherit">{msg(messages.url)}</TextZeta>
            </NavTab>
          </TabGroup>
        </Navigation>
        {activeTab === "code" ? (
          <Textarea
            label={msg(messages.embedCode)}
            value={embedValue}
            onChange={e => setValue(e, "code")}
            rows={10}
            placeholder={intl.formatMessage(messages.embedCode)}
          />
        ) : (
          <Input
            type="text"
            value={embedValue}
            onChange={e => setValue(e, "url")}
            label={msg(messages.embedUrl)}
            placeholder={intl.formatMessage(messages.embedUrl)}
          />
        )}
        {previewError ? (
          <BodyUI color={alert}>{msg(messages.previewError)}</BodyUI>
        ) : (
          <PreviewContainer>
            {previewLoading && <BodyUI>{msg(messages.previewMessage)}</BodyUI>}

            {previewEmbed && !previewLoading && (
              <div dangerouslySetInnerHTML={{ __html: previewEmbed }} />
            )}
          </PreviewContainer>
        )}
      </ModalContent>
    </Modal>
  );
};

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
`;

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

const PreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
  max-height: 200px;
  overflow: hidden;
`;

export default injectIntl(EmbedModal);
