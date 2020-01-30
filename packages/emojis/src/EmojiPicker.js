import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { IconFace } from "@happeokit/icons";
import TetherComponent from "react-tether";
import styled from "styled-components";
import {
  lighten,
  active,
  gray01,
  gray04,
  gray05,
  gray06,
  gray08
} from "@happeokit/colors";
import { trackEvent, events } from "@universe/analytics";
import { shadow500 } from "@happeokit/theme";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import messages from "./messages";
import { injectIntl } from "react-intl";
import categoryIcons from "./categoryIcons";
import { IconButton } from "@happeokit/buttons";
import { sansFamily } from "@happeokit/typography";

const EmojiPicker = ({ onSelected, intl, customEmojis = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectEmoji = emoji => {
    setIsOpen(false);
    trackEvent(events.EDITOR_SELECT_EMOJI_PICKER);
    onSelected && onSelected(emoji);
  };

  const handleClickOutside = event => {
    event.stopPropagation();
    const button = document.getElementById("emojiTetherButton");
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target) &&
      !button.contains(event.target)
    )
      setIsOpen(false);
  };
  return (
    <TetherComponent
      style={{ zIndex: "20" }}
      attachment="top center"
      constraints={[
        {
          to: "window",
          attachment: "together",
          pin: ["left", "right"]
        }
      ]}
      remove={true}
      targetAttachment="bottom center"
      classPrefix="emojidrop"
      /* renderTarget: This is what the item will be tethered to, make sure to attach the ref */
      renderTarget={ref => (
        <span ref={ref}>
          <IconButton
            icon={IconFace}
            onClick={() => setIsOpen(isOpen => !isOpen)}
            id="emojiTetherButton"
          />
        </span>
      )}
      /* renderElement: If present, this item will be tethered to the the component returned by renderTarget */
      renderElement={ref =>
        isOpen && (
          <StyledPicker ref={wrapperRef}>
            <Picker
              ref={ref}
              perLine={8}
              onSelect={selectEmoji}
              emoji="point_up_2"
              title={intl.formatMessage(messages.pickYourEmoji)}
              icons={categoryIcons}
              color={active}
              style={{ width: "324px" }}
              custom={customEmojis}
            />
          </StyledPicker>
        )
      }
    />
  );
};

const StyledPicker = styled.div`
  font-family: ${sansFamily};
  color: ${gray01};
  .emoji-mart {
    box-shadow: ${shadow500};
    border-radius: 6px;
    border: 0;
  }
  .emoji-mart-category {
    margin-top: 6px;
  }
  .emoji-mart-bar {
    border-color: ${gray08};

    :first-child {
      border-radius: 6px 6px 0 0;
    }
    :last-child {
      border-radius: 0 0 6px 6px;
    }
  }
  .emoji-mart-anchors {
    button:focus {
      outline: none;
    }
    svg {
      fill: ${gray04};
    }
  }
  .emoji-mart-anchor:hover {
    background-color: inherit;
  }
  .emoji-mart-anchor:hover svg,
  .emoji-mart-anchor-selected svg {
    fill: ${active};
  }
  .emoji-mart-category-label span {
    font-weight: normal;
    font-size: 14px;
  }
  .emoji-mart-search input {
    border-color: ${gray06};
    padding: 8px 10px;
    border-radius: 4px;
    box-sizing: border-box;

    ::placeholder {
      color: ${gray05};
    }
  }
  .emoji-mart-search button:disabled:hover {
    background-color: inherit;
  }
  .emoji-mart-search-icon {
    background-color: inherit;
    top: 9px;
  }
  .emoji-mart-title-label {
    font-size: 20px;
  }
  .emoji-mart-category .emoji-mart-emoji:hover:before {
    border-radius: 4px;
    background-color: ${lighten(active, 0.9)};
  }
  .emoji-mart-preview-data {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .emoji-mart-preview-emoticons {
    display: none;
  }

  .emoji-mart .emoji-mart-emoji {
    background-color: inherit;
  }
`;

EmojiPicker.propTypes = {
  onSelected: PropTypes.func.isRequired
};

export default injectIntl(EmojiPicker);
