import React, { useEffect, useState } from "react";
import Loadable from "react-loadable";

import PropTypes from "prop-types";
import styled from "styled-components";
import Tribute from "tributejs";
import { injectIntl } from "react-intl";
import { getEditorConf } from "./config";
import messages from "./messages";
import * as plugins from "./customPlugins";
import { customClasses } from "./constants";
import {
  emojiPickerConfig,
  getMentionConfig,
  getHashtagPickerConfig
} from "./extensions";
import { EmbedModal, PageLinkModal } from "./Modals";

// Vendor styles
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "tributejs/dist/tribute.css";
//Custom styles
import { EditorStyle } from "./styles";

const FroalaEditor = Loadable({
  loader: () => import("react-froala-wysiwyg"),
  loading: () => <p>Loading...</p>
});

const initPlugins = FE => {
  for (let plugin of Object.keys(plugins)) {
    plugins[plugin](FE);
  }
};

/**
 *
 * Editor
 *
 */
const Editor = ({
  intl,
  content,
  type,
  showMentionPicker,
  showEmojiPicker,
  showHashtagPicker,
  channelId,
  opts,
  searchHashtags,
  createHashtag
}) => {
  const [model, setModel] = useState(content);
  const { locale } = intl;
  const [embedModalOpen, setEmbedModalOpen] = useState(false);
  const [pageLinkModalOpen, setPageLinkModalOpen] = useState(false);
  const [config, setConfig] = useState({});

  useEffect(() => {
    import("froala-editor/js/froala_editor.pkgd.min").then(FE => {
      import("froala-editor/js/plugins.pkgd.min.js").then(() => {
        const conf = Object.assign(
          {},
          getEditorConf(FE, type, locale, {
            paragraphFormat,
            embedModalOpts: { toggle: setEmbedModalOpen },
            linkModalOpts: { toggle: setPageLinkModalOpen }
          }),
          opts,
          { events: { initialized: afterInit } }
        );
        setConfig(conf);
      });
    });
    import("froala-editor").then(editor => {
      initPlugins(editor);
    });
  }, []);

  const paragraphFormat = {
    P: intl.formatMessage(messages.bodyText),
    H1: intl.formatMessage(messages.h1),
    H2: intl.formatMessage(messages.h2),
    H3: intl.formatMessage(messages.h3)
  };

  function afterInit() {
    // Config collection
    let collection = [];

    if (showMentionPicker) {
      collection.push(getMentionConfig(channelId));
    }

    if (showEmojiPicker) {
      collection.push(emojiPickerConfig);
    }

    if (showHashtagPicker) {
      collection.push(
        getHashtagPickerConfig({ searchHashtags, createHashtag, type })
      );
    }

    // Init all plugins
    if (collection.length) {
      const tribute = new Tribute({ collection });

      tribute.attach(this.el);

      if (this && this.events) {
        this.events.on(
          "keydown",
          function(e) {
            switch (e.key) {
              case "Enter":
                if (tribute.isActive) return false;
                break;
              case 8: //backspace
                const element = this.selection.element();
                if (
                  element &&
                  element.tagName === "A" &&
                  element.href &&
                  ~element.href.indexOf("/hashtags/")
                ) {
                  element.parentNode.removeChild(element);
                }
                break;
              default:
                break;
            }
          },
          true
        );
      }
    }
  }

  return (
    <Wrapper className={customClasses[type]}>
      <EditorStyle />
      <FroalaEditor
        tag="textarea"
        config={config}
        model={model}
        onModelChange={setModel}
      />

      <EmbedModal
        isOpen={embedModalOpen}
        close={() => setEmbedModalOpen(false)}
      />
      <PageLinkModal
        isOpen={pageLinkModalOpen}
        close={() => setPageLinkModalOpen(false)}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

Editor.propTypes = {
  intl: PropTypes.object,
  content: PropTypes.string,
  type: PropTypes.string,
  opts: PropTypes.object
};

Editor.defaultProps = {
  type: "inline"
};

export default injectIntl(Editor);
