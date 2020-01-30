import { createGlobalStyle, css } from "styled-components";
import {
  white,
  gray01,
  gray04,
  gray06,
  gray07,
  active,
  alert,
  toBgLight,
  lighten80,
  darken,
  lighten,
  gray03
} from "@happeokit/colors";
import { media } from "@happeokit/layout";
import { sansFamily } from "@happeokit/typography";

const focusColorHover = "rgba(0, 153, 233, 0.05)";

export const EditorStyle = createGlobalStyle`
  .mentioned-user {
    position: relative;
    white-space: nowrap;
    z-index: 0;
    margin: 0 1px;
    cursor: pointer;
    display: inline-block;

    &::before {
      content: " ";
      position: absolute;
      left: -2px;
      top: 0;
      right: -2px;
      bottom: -3px;
      z-index: -1;
      margin-bottom: 1px;
      border-radius: 0.2em;
      border: 1px solid transparent;
      background-color: #fff5cc;
      opacity: 1;
      transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    &:hover {
      z-index: 1;

      &::before {
        opacity: 1;
        border: 1px solid #ffd933;
      }
    }

    &.this-is-me:before {
      box-shadow: 0px 0px 0px rgba(15, 101, 183, 1);
      animation: pulse 2s 5;
      border: 1px solid #ffd933;
    }
  }
  .emoji-picker__emoji {
    margin-right: 0.75em;
    font-size: 20px;
  }

  // ARTICLE STYLES

  .article-subtitle {
    font-weight: normal;
    color: rgba(15, 22, 33, 0.7);
    line-height: 1.29;
  }
  .article-body.markdown {
    h1 {
      font-size: 32px;
      font-weight: bold;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.13;
      letter-spacing: -0.3px;
    }
    h2 {
      font-size: 24px;
      font-weight: bold;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.17;
      letter-spacing: normal;
    }
    h3 {
      font-size: 20px;
      font-weight: bold;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.2;
      letter-spacing: 0.1px;
      color: ${gray01};
    }
    p,
    ul,
    ol,
    li {
      font-size: 18px;
      line-height: 1.56;
      letter-spacing: 0.1px;
    }
    hr {
      border-color: #d4dbe1;
      border-width: 2px 0 0 0;
    }
    blockquote {
      border-top: 2px solid #d4dbe1;
      border-bottom: 2px solid #d4dbe1;
      border-left: none;
      color: ${gray01};
      font-size: 18px;
      padding: 24px 48px;
      position: relative;
      text-align: center;
      margin: 48px 0;
      display: inline-block;
      width: 100%;
    }
    blockquote p {
      font-size: 24px;
      margin: 0 auto;
    }
    table {
      font-size: 18px;
    }
    p {
      margin-bottom: 18px;
    }
    p + p {
      margin-top: 18px;
    }
    p {
      img:first-child,
      span.fr-img-caption:first-child {
        &.article-align-left,
        &.article-align-right {
          ${media.min.md`
           margin-top: 8px;
          `}
        }
      }
    }
    span.fr-img-caption {
      text-align: center;
      img {
        margin: 0;
      }
      .fr-inner {
        font-weight: 400;
        font-size: 16px;
        margin: 8px auto 0 auto;
        padding: 0 8px;
        color: ${gray04};
        display: block;
        max-width: 671px;
      }
    }
    img {
      &.image-border-radius {
        border-radius: 6px;
      }
      &.image-box-shadow {
        box-shadow: 0 4px 16px 0 #bacad5;
      }
    }
    span.fr-img-caption {
      &.image-border-radius img {
        border-radius: 6px;
      }
      &.image-box-shadow img {
        box-shadow: 0 4px 16px 0 #bacad5;
      }
    }
    img,
    span.fr-img-caption,
    span.fr-video {
      display: block;
      margin: 30px auto;
      ${media.only.xs`      
        max-width: 100%;
      `};
      &.article-align-left {
        margin: 30px auto;
        display: block;
        max-width: 100%;
        ${media.min.md`
          margin: 30px 30px 10px -150px;
          float: left;
          max-width: 75%;
        `}
      }
      &.article-align-center {
        margin: 30px auto;
        display: block;
      }
      &.article-align-right {
        margin: 30px auto;
        display: block;
        max-width: 100%;
        ${media.min.md`
          margin: 30px -150px 10px 30px;
          float: right;
          max-width: 75%;
        `}
      }
      &.article-align-overflow {
        margin: 30px auto;
        display: block;
        max-width: 100%;
        ${media.min.md`
            margin: 30px -150px;
            width: calc(100% + 300px) !important;
            max-width: none;
          `}
        img {
          width: 100%;
        }
      }
    }

    span.fr-video {
      position: relative;
      padding-bottom: 56.25%;
      padding-top: 30px;
      height: 0;
      overflow: hidden;

      border-radius: 6px;

      &.article-align-overflow {
        padding-top: 170px;
      }
      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100% !important;
        height: 100% !important;
      }
    }
  }

  .content-attachments {
    width: 100%;
  }

  .markdown pre {
    position: relative;
    background-color: rgb(245, 245, 245);
    padding: 1em;
    margin: 1em 0;
    border-radius: 4px;
    white-space: pre;
  }

  .article-body .markdown {
    font-size: 14px;
    line-height: 1.43;
    p {
      white-space: pre-wrap;
    }
    p,
    ul,
    ol,
    li {
      font-size: 14px;
      line-height: 1.43;
    }
    ul {
      list-style-type: disc;
    }

    blockquote {
      border-top: 2px solid #d4dbe1;
      border-bottom: 2px solid #d4dbe1;
      font-size: 18px;
      padding: 24px 48px;
      position: relative;
      text-align: center;
      margin: 48px 0;
    }
    ol {
      list-style-type: decimal;
      counter-reset: item;
      li {
        padding-left: 12px;
        text-indent: -33px;
        list-style-type: none;
        counter-increment: item;
        &:before {
          display: inline-block;
          width: 13px;
          padding-right: 15px;
          padding-left: 5px;
          font-weight: bold;
          text-align: right;
          content: counter(item) ".";
        }
      }
    }
    ol,
    ul {
      margin: 18px 16px;
      list-style-position: outside;
      display: block;
      li,
      li {
        margin-bottom: 5px;
        padding-left: 10px;
        > ul,
        > ol {
          -webkit-margin-before: 8px !important;
          -webkit-margin-after: 8px !important;
        }
      }

      &:first-child,
      &:first-child {
        -webkit-margin-before: 0;
      }
      &:last-child,
      &:last-child {
        -webkit-margin-after: 0;
      }
    }
    img {
      max-width: 100%;
      margin: 15px 0;
      & + img {
        margin-top: 0;
      }
    }
    .xl-emoji * {
      font-size: 40px;
      line-height: 1.2;
    }
  }

  .article-body.markdown {
    hr {
      -webkit-margin-before: 16px;
      -webkit-margin-after: 13px;
      border-color: #dadada;
      border-style: solid;
      height: 0px;
      border-width: 1px 0 0 0;
    }
    table {
      width: 100%;
      margin: 15px 0;
      text-align: left;
      thead th {
        background: ${white};
      }
      th,
      td {
        border-width: 1px;
        border-style: solid;
        border-color: #dadada;
        padding: 0.5em;
      }
      tr:nth-child(odd) {
        background: rgb(245, 245, 245);
      }
      tr:nth-child(even) {
        background: ${white};
      }
    }
    table.no-borders {
      th,
      td {
        border: none;
        padding: 2em;
      }

      tr:nth-child(odd) {
        background: rgb(245, 245, 245);
      }
      tr:nth-child(even) {
        background: ${white};
      }
    }
  }

  // FROALA STYLES
  .universe-theme .fr-view table td,
  .universe-theme .fr-view table th {
    border: 1px solid #dddddd;
  }

  .universe-theme {
    .fr-qi-helper {
      background-color: ${white};
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.25);
      display: flex;
      vertical-align: middle;
      border-radius: 2px;
      padding: 2px 6px 0 6px;
      transform: translate3d(0, -2px, 0);
      border: 1px solid rgba(0, 0, 0, 0.025);

      a.fr-floating-btn {
        transform: scale(1);
        display: block;
        height: auto;
        width: auto;
        line-height: 1;
        box-shadow: none;
        border-radius: 0;
        margin: 0 !important;
        animation: none;

        img {
          height: 24px;
          width: 24px;
          border: 0;
          opacity: 0.7;
          margin: 10px 13px;
        }

        svg {
          width: 25px;
          height: 25px;
        }

        &:hover {
          background-color: ${white};
        }
      }
      &:after {
        content: "";
        display: block;
        position: absolute;
        width: 0;
        height: 0;
        border-color: transparent ${white} transparent transparent;
        border-width: 8px;
        border-style: solid;
        right: 100%;
        top: 50%;
        height: 0px;
        margin-top: -8px;
      }
    }
    .fr-quick-insert {
      &.fr-on {
        svg {
          fill: ${active} !important;
        }
      }

      a.fr-floating-btn {
        background: ${white};
        color: #1e88e5;
        transition: background 0.2s ease 0s, color 0.2s ease 0s,
          transform 0.2s ease 0s;
        line-height: 46px;
        border: 0;
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.25);

        &:hover {
          background-color: ${toBgLight(active)};
          border-color: ${active};

          svg {
            fill: ${gray03};
          }
        }
        svg {
          transition: transform 0.2s ease 0s;
          fill: ${gray03};
        }
      }
    }

    .fr-view blockquote {
      border-left: 0;
      margin-left: 0;
      padding-left: 0;
      margin: 0;
      color: inherit;

      p {
        line-height: 30px;
        font-size: 26px;
        text-align: center;
        margin: 1.25em 0;
      }
    }
  }
  .universe-theme img.fr-dib {
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .universe-theme img.fr-dib.fr-fil {
    margin: 5px auto 5px 0;
    left: 5px;
  }

  .universe-theme img.fr-dib.fr-fir {
    margin: 5px 0 5px auto;
    right: 5px;
  }

  .universe-theme img.fr-dii {
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .universe-theme img.fr-dii.fr-fil {
    margin: 5px 10px 5px 0;
    left: 5px;
  }

  .universe-theme img.fr-dii.fr-fir {
    margin: 5px 0 5px 10px;
    right: 5px;
  }

  .universe-theme.fr-tooltip {
    transform: translate3d(0, 8px, 0);
    padding: 6px 13px;
    line-height: 13px;
    border-radius: 2px;
    background-clip: padding-box;
    box-shadow: none;
    background: #0f1621;
    color: #ffffff;
    font-size: 11px;
    line-height: 22px;
    font-family: Lato, sans-serif;
    transition: opacity 0.2s ease 0s;

    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 0;
      height: 0;
      border-color: transparent transparent ${gray01} transparent;
      border-width: 6px;
      border-style: solid;
      bottom: 100%;
      left: 50%;
      height: 0px;
      margin-left: -6px;
    }
  }
  .universe-theme .fr-element {
    color: #0f1621;
  }

  .universe-theme .fr-element a {
    color: ${active};
  }

  .universe-theme.fr-box.fr-basic .fr-element {
    padding: 10px;
    border-radius: 2px;
  }

  .universe-theme .fr-wrapper .fr-placeholder {
    font-size: 12px;
    color: #aaaaaa;
    top: 18px;
  }

  .universe-theme .fr-wrapper ::selection {
    background: #b5d6fd;
    color: #0f1621;
  }

  .universe-theme.fr-box.fr-basic .fr-wrapper {
    background: #ffffff;
    border: 4px;
    border-top: 0;

    .fr-placeholder {
      top: 2px;
      left: 2px;
    }
  }

  .universe-theme.fr-box.fr-basic.fr-top .fr-wrapper {
    box-shadow: none;
    border-radius: 0 0 2px 2px;
    background-clip: padding-box;
    overflow-x: hidden !important;
  }

  .universe-theme.fr-box.fr-basic.fr-bottom .fr-wrapper {
    box-shadow: none;
    border-radius: 2px 2px 0 0;
    background-clip: padding-box;
  }

  .universe-theme.fr-toolbar .fr-command.fr-btn,
  .universe-theme.fr-popup .fr-command.fr-btn {
    box-shadow: none;
    text-shadow: none;
    color: #0f1621;
    margin: 0px;
    width: auto;
    height: auto;
    transition: background 0.2s ease 0s;

    &.fr-dropdown {
      padding-right: 16px;

      &::after {
        right: 10px;
      }
    }

    i {
      font-size: 15px;
      width: 15px;
      margin: 11px 11.5px;
    }

    span {
      font-size: 14px;
      line-height: 14px;
      margin: 11px 11.5px;
      min-width: 15px;
      height: 15px;
    }
  }
  .universe-theme.fr-toolbar .fr-command.fr-btn img,
  .universe-theme.fr-popup .fr-command.fr-btn img {
    margin: 13px 13px;
    width: 24px;
    height: 24px;
    opacity: 0.7;
  }

  .universe-theme.fr-toolbar .fr-command.fr-btn svg {
    height: 24px;
  }

  .universe-theme.fr-toolbar .fr-command.fr-btn.fr-dropdown span {
    margin: 13px;
  }

  .universe-theme.fr-toolbar .fr-command.fr-btn.fr-dropdown i,
  .universe-theme.fr-popup .fr-command.fr-btn.fr-dropdown i,
  .universe-theme.fr-popup .fr-command.fr-btn.fr-dropdown span,
  .universe-theme.fr-toolbar .fr-command.fr-btn.fr-dropdown img,
  .universe-theme.fr-popup .fr-command.fr-btn.fr-dropdown img {
    margin-left: 13px;
    margin-right: 13px;
  }

  .universe-theme.fr-toolbar .fr-command.fr-btn.fr-dropdown.fr-active,
  .universe-theme.fr-popup .fr-command.fr-btn.fr-dropdown.fr-active {
    color: #0f1621;
    background: transparent;
  }

  .universe-theme.fr-toolbar .fr-command.fr-btn.fr-dropdown.fr-active:hover,
  .universe-theme.fr-popup .fr-command.fr-btn.fr-dropdown.fr-active:hover,
  .universe-theme.fr-toolbar .fr-command.fr-btn.fr-dropdown.fr-active:focus,
  .universe-theme.fr-popup .fr-command.fr-btn.fr-dropdown.fr-active:focus {
    background: transparent !important;
    color: #0f1621 !important;
  }

  .universe-theme.fr-toolbar .fr-command.fr-btn.fr-disabled,
  .universe-theme.fr-popup .fr-command.fr-btn.fr-disabled {
    color: #bdbdbd;

    &::after {
      border-top-color: transparent;
    }
  }
  .universe-theme.fr-toolbar.fr-disabled .fr-btn,
  .universe-theme.fr-popup.fr-disabled .fr-btn,
  .universe-theme.fr-toolbar.fr-disabled .fr-btn.fr-active,
  .universe-theme.fr-popup.fr-disabled .fr-btn.fr-active {
    color: #bdbdbd;

    &:after {
      border-top-color: transparent;
    }
  }

  .universe-theme.fr-desktop {
    .fr-command {
      &:focus,
      &:hover {
        background: ${toBgLight(active)} !important;
      }

      &:active {
        background: ${lighten80(active)} !important;
      }
    }
    &:after {
      border-top-color: transparent !important;
    }
  }

  .universe-theme.fr-desktop .fr-command.fr-disabled:hover,
  .universe-theme.fr-desktop .fr-command.fr-disabled:focus,
  .universe-theme.fr-desktop .fr-command.fr-disabled.fr-selected,
  .universe-theme.fr-toolbar.fr-mobile .fr-command.fr-blink,
  .universe-theme.fr-popup.fr-mobile .fr-command.fr-blink {
    background: transparent;
  }

  .universe-theme .fr-command.fr-btn + .fr-dropdown-menu {
    border-radius: 2px;
    background-clip: padding-box;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
  }

  .universe-theme .fr-command.fr-btn + .fr-dropdown-menu .fr-dropdown-wrapper {
    background: #ffffff;
    box-shadow: none;
    transition: max-height 0.2s ease 0s;

    .fr-dropdown-content {
      max-height: 275px;

      ul.fr-dropdown-list li a {
        display: flex;
        align-items: center;
        padding: 12px 21px;
        line-height: 1;
        position: relative;
        line-height: 18px;
      }

      ul.fr-dropdown-list li a.fr-active {
        background-color: transparent;
        path {
          fill: ${active};
        }
      }
    }
  }
  .universe-theme
    .fr-command.fr-btn
    + .fr-dropdown-menu
    .fr-dropdown-wrapper
    .fr-dropdown-content
    ul.fr-dropdown-list
    li
    a {
    &:hover {
      background-color: transparent;
      color: #0099e9;
    }

    img {
      width: 20px;
      height: 20px;
      opacity: 0.7;
      margin: 0;
    }

    &.fr-disabled {
      color: ${gray06};
    }
  }
  .universe-theme
    .fr-command.fr-btn.fr-active
    + .fr-dropdown-menu
    .fr-dropdown-wrapper {
    max-height: 275px;
  }

  .universe-theme .fr-bottom > .fr-command.fr-btn + .fr-dropdown-menu {
    box-shadow: none;
    border-radius: 2px 2px 0 0;
    background-clip: padding-box;
  }

  .universe-theme.fr-popup {
    color: ${gray01};
    box-shadow: 0px 4px 16px rgba(186, 198, 208, 0.5),
      0px 4px 16px rgba(0, 157, 255, 0.05);
    background: #fff;
    border-radius: 4px;
    background-clip: padding-box;
    font-family: ${sansFamily};
    border: 0;
    z-index: 201 !important;
  }

  .universe-theme.fr-popup .fr-input-line {
    input[type="text"],
    textarea {
      font-family: ${sansFamily};
      width: 100%;
      height: 40px;
      border-radius: 4px;
      border: solid 1px ${gray06};
      box-sizing: border-box;
      box-shadow: none;
      font-size: 14px;
      padding: 10px 12px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.43;
      letter-spacing: 0.3px;
      color: ${gray01};
    }
  }

  .universe-theme.fr-popup {
    .fr-link-insert-layer {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: space-between;
      background-color: rgb(245, 245, 245);
    }

    .fr-layer.fr-active {
      background: ${white};
    }
  }

  .universe-theme.fr-popup .fr-link-insert-layer .fr-input-line {
    background-color: ${white};
  }

  .universe-theme.fr-popup .fr-link-insert-layer .fr-action-buttons {
    flex-grow: 1;
  }

  .universe-theme.fr-popup .fr-image-alt-layer,
  .universe-theme.fr-popup .fr-image-size-layer .fr-image-group {
    display: flex;
  }

  .universe-theme.fr-popup .fr-link-insert-layer .fr-checkbox-line {
    margin: 13px;
  }

  .fr-popup.universe-theme
    .fr-link-insert-layer
    .fr-checkbox-line
    .fr-checkbox {
    top: 0;
  }

  .fr-popup.universe-theme .fr-checkbox-line label {
    line-height: 20px;
    font-size: 0.8rem;
    text-transform: uppercase;
    color: rgba(15, 22, 33, 0.7);
    font-weight: 700;
  }

  .universe-theme.fr-popup .fr-image-alt-layer,
  .universe-theme.fr-popup .fr-image-size-layer .fr-image-group {
    display: flex;
  }

  .universe-theme.fr-popup .fr-link-insert-layer .fr-action-buttons,
  .universe-theme.fr-popup .fr-image-alt-layer .fr-action-buttons {
    background-color: ${white};
  }

  .universe-theme.fr-popup .fr-image-size-layer {
    display: flex;
    align-items: flex-end;
    width: 250px;

    .fr-input-line {
      padding-top: 24px;
      width: 100%;

      &:first-child {
        border-right: solid 1px rgba(15, 22, 32, 0.2);
      }

      input.fr-not-empty + label {
        display: block;
      }

      input + label {
        color: inherit;
        font-size: 11px;
        text-transform: uppercase;
        font-weight: bold;
        padding: 9px 12px;
        color: rgba(15, 22, 33, 0.7);
      }
    }
  }
  .universe-theme.fr-popup .fr-input-line {
    input + span,
    textarea + span {
      transition: color 0.2s ease 0s;
    }

    input.fr-not-empty:focus + span,
    textarea.fr-not-empty:focus + span {
      color: #1e88e5;
    }

    input.fr-not-empty + span,
    textarea.fr-not-empty + span {
      color: #808080;
    }
  }
  .universe-theme.fr-popup .fr-buttons {
    padding: 0;
    box-shadow: none;
    border-bottom: 4px;
  }

  .universe-theme.fr-popup .fr-color-hex-layer.fr-layer,
  .universe-theme.fr-popup .fr-table-colors-hex-layer.fr-layer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgb(245, 245, 245);

    .fr-input-line {
      flex-grow: 1;
    }

    .fr-action-buttons {
      padding: 0 8px;
    }
  }

  // Button styles
  .universe-theme.fr-popup .fr-action-buttons button.fr-command {
    font-family: ${sansFamily};
    font-size: 14px;
    border-radius: 6px;
    padding: 9px 16px;
    white-space: nowrap;
    color: ${white};
    cursor: pointer;
    box-shadow: none;
    text-shadow: none;
    border-color: transparent;
    transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
    outline: none;
    background: ${active};

    :disabled:hover {
      cursor: not-allowed;
      background: ${gray06};
    }
    :disabled {
      background: ${gray07};
    }
    :disabled:hover {
      box-shadow: none;
    }

    :hover {
      background: ${darken(active, 0.2)};
    }
    :active {
      background: ${darken(active, 0.2)};
      box-shadow: none !important;
    }
    :focus {
      box-shadow: 0 0 0 1px ${lighten(active, 0.3)};
      border: 1px solid ${white};
    }
  }

  .universe-theme.fr-popup .fr-checkbox svg {
    margin-left: 3px;
    margin-top: 3px;
  }

  .universe-theme.fr-popup .fr-checkbox span {
    width: 20px;
    height: 20px;
    border: solid 2px #666666;
    border-radius: 2px;
    background-clip: padding-box;
    transition: background 0.2s ease 0s, border-color 0.2s ease 0s;
  }

  .universe-theme.fr-popup .fr-checkbox input:checked + span {
    background: #1e88e5;
    border-color: #1e88e5;
  }

  .universe-theme.fr-popup .fr-checkbox input:focus + span {
    border-color: #1e88e5;
  }

  .universe-theme.fr-popup.fr-desktop .fr-arrow {
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #fff;
    top: -6px;
    margin-left: -6px;
  }

  .universe-theme.fr-popup.fr-desktop.fr-above .fr-arrow {
    bottom: -5px;
    border-top-width: 5px;
  }

  .universe-theme.fr-toolbar {
    color: #0f1621;
    background: #ffffff;
    font-family: ${sansFamily};
    padding: 0;
    border-radius: 2px;
    background-clip: padding-box;
    box-shadow: none;
    border: 4px;
    border-top: 5px solid transparent;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.25);
  }

  .universe-theme.fr-toolbar.fr-inline.fr-desktop {
    border: 1px solid rgba(0, 0, 0, 0.025);
  }

  .universe-theme.fr-toolbar.fr-inline.fr-desktop .fr-arrow {
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #fff;
    top: -6px;
    margin-left: -6px;
  }

  .universe-theme.fr-toolbar.fr-inline.fr-desktop.fr-above {
    border-bottom: 6px solid #fff;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }

  .universe-theme.fr-toolbar.fr-inline.fr-desktop.fr-above .fr-arrow {
    bottom: -9px;
    border-top-width: 5px;
  }

  .universe-theme.fr-toolbar.fr-top {
    border-radius: 2px 2px 0 0;
    background-clip: padding-box;
    box-shadow: none;
  }

  .universe-theme.fr-toolbar.fr-bottom {
    border-radius: 0 0 2px 2px;
    background-clip: padding-box;
    box-shadow: none;
  }

  .universe-theme .fr-separator {
    background: #ebebeb;
  }

  .fr-toolbar
    .fr-command.fr-btn.fr-dropdown.fr-selection[data-cmd="paragraphFormat"]:hover::after {
    border-top-color: rgba(15, 22, 33, 1) !important;
  }

  .fr-toolbar
    .fr-command.fr-btn.fr-dropdown.fr-selection[data-cmd="paragraphFormat"]::after {
    border-top: 4px solid rgba(15, 22, 33, 0.7);
  }

  .universe-theme .fr-separator.fr-vs {
    height: 26px;
    width: 1px;
    margin: 12px 2px 12px 3px;
    border-left: solid 1px rgba(15, 22, 32, 0.1);
  }

  .universe-theme .fr-separator.fr-hs {
    height: 1px;
    width: 96%;
    margin: 0 2px;
  }

  .universe-theme.fr-box .fr-counter {
    color: #cccccc;
    background: #ffffff;
    border-top: solid 1px #ebebeb;
    border-left: solid 1px #ebebeb;
    border-radius: 2px 0 0 0;
    background-clip: padding-box;
  }

  .universe-theme.fr-box.fr-rtl .fr-counter {
    border-right: solid 1px #ebebeb;
    border-radius: 0 2px 0 0;
    background-clip: padding-box;
  }

  .universe-theme textarea.fr-code {
    background: #ffffff;
    color: #0f1621;
  }

  .universe-theme.fr-box.fr-code-view.fr-inline {
    border: solid 2px #d4dbe1;
    border-radius: 2px;
    box-shadow: none;

    textarea {
      box-shadow: none;
    }
  }
  .universe-theme.fr-box.fr-inline.fr-code-view .fr-command.fr-btn.html-switch {
    display: flex;
    align-items: center;
    font-family: ${sansFamily};
    height: 45px;
    right: 0;
    top: 0;
    text-shadow: none;
    box-shadow: none;
    background-color: ${active};
    color: ${white};
    font-size: 14px;
    line-height: 20px;
    white-space: nowrap;
    padding: 10px 12px;
    font-weight: normal;
    border-radius: 6px;
    box-shadow: none;
    transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);

    &:hover,
    &:focus {
      color: ${white};
      background-color: ${active};
      box-shadow: 0 4px 8px 0 rgba(186, 198, 208, 0.5),
        0 4px 8px 0 rgba(0, 153, 233, 0.5);
    }

    &:active {
      background-color: ${active};
      transform: translate3d(0, 0, 0);
    }

    img {
      width: 24px;
      height: 24px;
      opacity: 0.7;
      margin: 0;
    }
  }
  .universe-theme .fr-view span.fr-emoticon.fr-emoticon-img {
    margin: 0;
  }

  .universe-theme .fr-dropdown-list .fr-dropdown-list--text {
    padding: 12px 14px !important;
  }

  .universe-theme .fr-dropdown-list .fr-dropdown-list--text > span {
    vertical-align: 4px;
    margin-left: 8px;
  }

  .universe-theme .fr-dropdown-list .fr-dropdown-list--divider {
    height: 1px;
    border-top: 1px solid rgba(15, 22, 32, 0.1);
    margin: 0 12px !important;
  }

  .fr-image-progress-bar-layer {
    padding: 13px;
  }

  .universe-theme.fr-popup .fr-colors-tabs,
  .universe-theme.fr-popup .fr-table-colors {
    box-shadow: none;
    margin-bottom: 0;
    margin-left: 0;
    margin-right: 0;
  }

  .universe-theme.fr-popup
    .fr-colors-tabs
    .fr-colors-tab[data-param1="background"]::after {
    height: 3px;
  }

  .universe-theme.fr-popup .fr-colors-tabs .fr-colors-tab,
  .universe-theme.fr-popup .fr-table-colors .fr-colors-tab {
    color: #0f1621;
    text-align: center;
  }

  .universe-theme.fr-popup .fr-colors-tabs .fr-colors-tab:hover,
  .universe-theme.fr-popup .fr-table-colors .fr-colors-tab:hover {
    color: #1e88e5;
  }

  .universe-theme.fr-popup .fr-colors-tabs .fr-colors-tab img,
  .universe-theme.fr-popup .fr-table-colors .fr-colors-tab img {
    width: 24px;
    height: 24px;
    opacity: 0.7;
    margin: 0;
  }

  .universe-theme.fr-popup .fr-color-set,
  .universe-theme.fr-popup .fr-table-colors {
    padding: 3px;
  }

  .universe-theme.fr-popup .fr-color-set .fr-select-color,
  .universe-theme.fr-popup .fr-table-colors .fr-command {
    margin: 3px;
    width: 25px;
    height: 25px;
  }

  .universe-theme.fr-popup .fr-table-colors > span.fr-selected-color {
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  }

  .universe-theme.fr-popup .fr-color-set > span .fr-selected-color {
    line-height: 25px;
  }

  .universe-theme.fr-popup .fr-color-set > span > i {
    line-height: 25px;
    height: 25px;
    width: 25px;
  }

  .universe-theme.fr-popup .fr-color-set .fr-select-color img,
  .universe-theme.fr-popup .fr-table-colors img {
    opacity: 0.7;
    margin: 4px;
    vertical-align: 3px;
  }

  .universe-theme.fr-popup
    .fr-colors-tabs
    .fr-colors-tab[data-param1="background"]::after {
    background: #1e88e5;
    transition: transform 0.2s ease 0s;
  }

  .universe-theme.fr-popup .fr-colors-tabs .fr-colors-tab.fr-selected-tab {
    color: #1e88e5;
  }

  .universe-theme.fr-popup .fr-color-set > span.fr-selected-color::after {
    color: #ffffff;
  }

  .universe-theme.fr-popup .fr-color-set > span:hover,
  .universe-theme.fr-popup .fr-color-set > span.fr-selected-color {
    outline: 1px solid #0091ea;
  }

  .universe-theme
    .fr-popup
    .fr-colors-tabs
    .fr-colors-tab[data-param1="background"]::after {
    height: 3px;
  }

  .universe-theme .fr-file-upload-layer {
    border: dashed 2px #bdbdbd;
  }

  .universe-theme .fr-file-upload-layer:hover {
    background: #ebebeb;
  }

  .universe-theme .fr-file-upload-layer.fr-drop {
    background: #ebebeb;
    border-color: #1e88e5;
  }

  .universe-theme .fr-file-progress-bar-layer > div.fr-loader {
    background: #bcdbf7;
  }

  .universe-theme .fr-file-progress-bar-layer > div.fr-loader span {
    background: #1e88e5;
    transition: width 0.2s ease 0s;
  }

  .universe-theme .fr-image-resizer {
    border: solid 1px #1e88e5;

    &.fr-resize-denied {
      border-color: ${alert};

      .fr-handler {
        background: ${alert};
      }
    }
  }
  .universe-theme {
    .fr-image-resizer {
      .fr-handler {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #1e88e5;
        border: solid 1px ${white};

        &.fr-hnw,
        &.fr-hne,
        &.fr-hsw,
        &.fr-hse {
          left: -6px;
          top: -6px;
        }
      }
    }
  }

  @media (min-width: 1200px) {
    .universe-theme {
      .fr-image-resizer {
        .fr-handler {
          width: 10px;
          height: 10px;

          &.fr-hnw,
          &.fr-hne,
          &.fr-hsw,
          &.fr-hse {
            left: -5px;
            top: -5px;
          }
        }
      }
    }
  }

  .universe-theme .fr-image-upload-layer {
    border: dashed 2px #bdbdbd;
  }

  .universe-theme .fr-image-upload-layer:hover {
    background: #ebebeb;
  }

  .universe-theme .fr-image-upload-layer.fr-drop {
    background: #ebebeb;
    border-color: #1e88e5;
  }

  .universe-theme .fr-image-progress-bar-layer > div.fr-loader {
    background: #bcdbf7;
  }

  .universe-theme .fr-image-progress-bar-layer > div.fr-loader span {
    background: #1e88e5;
    transition: width 0.2s ease 0s;
  }

  .universe-theme .fr-line-breaker {
    border-top: 1px solid #1e88e5;
  }

  .universe-theme .fr-line-breaker a.fr-floating-btn {
    left: 34%;
    top: -16px;
  }

  .universe-theme table td.fr-selected-cell,
  .universe-theme table th.fr-selected-cell {
    border: 1px double #1e88e5;
  }

  .universe-theme .fr-table-resizer div {
    border-right: 1px solid #1e88e5;
  }

  .universe-theme.fr-popup .fr-table-size .fr-select-table-size > span > span {
    border: 1px solid #dddddd;
  }

  .universe-theme.fr-popup
    .fr-table-size
    .fr-select-table-size
    > span:hover
    > span,
  .universe-theme.fr-popup
    .fr-table-size
    .fr-select-table-size
    > span.hover
    > span {
    background: rgba(30, 136, 229, 0.3);
    border: solid 1px #1e88e5;
  }

  .universe-theme.fr-popup .fr-table-colors > span.fr-selected-color::after {
    color: #ffffff;
  }

  .universe-theme.fr-popup .fr-table-colors > span:hover,
  .universe-theme.fr-popup .fr-table-colors > span.fr-selected-color {
    outline: 1px solid #0091ea;
  }

  .universe-theme {
    .fr-video:before {
      position: absolute;
      content: "";
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      z-index: 20;
    }
  }
  .universe-theme,
  .pages-text {
    .fr-view {
      .fr-video {
        margin: 1.25em auto;

        &.fr-dvi {
          margin: 1.25em auto;
          display: inline-block;
        }

        &.fr-fvl {
          margin-right: 1.25em;
        }

        &.fr-fvr {
          margin-left: 1.25em;
        }

        &.fr-dvb {
          display: block;
          text-align: center;
        }
      }
    }
    .fr-video-resizer {
      border: solid 1px #1e88e5;

      &.fr-active {
        display: block;
        z-index: 10;
        transform: translate3d(1px, 1px, 0);
        border-radius: 2px;
      }
    }
    .fr-video-resizer .fr-handler {
      background: #1e88e5;
      border: solid 1px #ffffff;
      width: 12px;
      height: 12px;
      border-radius: 50%;

      &.fr-hnw {
        left: -6px;
        top: -6px;
      }

      &.fr-hne {
        right: -6px;
        top: -6px;
      }

      &.fr-hsw {
        left: -6px;
        bottom: -6px;
      }

      &.fr-hse {
        right: -6px;
        bottom: -6px;
      }

      @media (min-width: 1200px) {
        width: 10px;
        height: 10px;
        &.fr-hnw {
          left: -5px;
          top: -5px;
        }

        &.fr-hne {
          right: -5px;
          top: -5px;
        }

        &.fr-hsw {
          left: -5px;
          bottom: -5px;
        }

        &.fr-hse {
          right: -5px;
          bottom: -5px;
        }
      }
    }
  }

  .universe-theme.fr-modal .fr-modal-wrapper {
    border-radius: 2px;
    background-clip: padding-box;
    background: #ffffff;
    box-shadow: none;
    border: 4px;
    border-top: 5px solid #0f1621;
  }

  .universe-theme.fr-modal .fr-modal-wrapper .fr-modal-title {
    background: #ffffff;
    transition: height 0.2s ease 0s;
    box-shadow: none;
    border-bottom: 4px;
  }

  .universe-theme.fr-modal
    .fr-modal-wrapper
    .fr-modal-title
    .fr-modal-title-line
    h4 {
    color: #0f1621;
  }

  .universe-theme.fr-modal
    .fr-modal-wrapper
    .fr-modal-title
    .fr-modal-title-line
    i {
    color: #0f1621;
  }

  .universe-theme.fr-modal
    .fr-modal-wrapper
    .fr-modal-title
    .fr-modal-title-line
    i.fr-modal-more {
    transition: padding 0.2s ease 0s, width 0.2s ease 0s, opacity 0.2s ease 0s;
  }

  .universe-theme.fr-modal
    .fr-modal-wrapper
    .fr-modal-title
    .fr-modal-title-line
    i.fr-modal-close {
    transition: color 0.2s ease 0s;
  }

  .universe-theme.fr-modal .fr-modal-wrapper .fr-modal-title .fr-modal-tags a {
    border-radius: 2px;
    background-clip: padding-box;
    color: #1e88e5;
    transition: opacity 0.2s ease 0s, background 0.2s ease 0s;
  }

  .universe-theme.fr-modal
    .fr-modal-wrapper
    .fr-modal-title
    .fr-modal-tags
    a.fr-selected-tag {
    background: #d6d6d6;
  }

  .universe-theme.fr-modal
    .fr-modal-wrapper
    div.fr-scroller
    div.fr-image-list
    div.fr-image-container {
    border-radius: 2px;
    background-clip: padding-box;
    box-shadow: none;
  }

  .universe-theme.fr-modal
    .fr-modal-wrapper
    div.fr-scroller
    div.fr-image-list
    div.fr-image-container.fr-image-deleting::after {
    transition: opacity 0.2s ease 0s;
    background: #0f1621;
  }

  .universe-theme.fr-modal
    .fr-modal-wrapper
    div.fr-scroller
    div.fr-image-list
    div.fr-image-container.fr-image-deleting::before {
    color: #ffffff;
  }

  .universe-theme.fr-modal
    .fr-modal-wrapper
    div.fr-scroller
    div.fr-image-list
    div.fr-image-container.fr-empty {
    background: #cccccc;
  }

  .universe-theme.fr-modal
    .fr-modal-wrapper
    div.fr-scroller
    div.fr-image-list
    div.fr-image-container
    img {
    transition: opacity 0.2s ease 0s, filter 0.2s ease 0s;
  }

  .universe-theme.fr-modal
    .fr-modal-wrapper
    div.fr-scroller
    div.fr-image-list
    div.fr-image-container
    .fr-delete-img,
  .universe-theme.fr-modal
    .fr-modal-wrapper
    div.fr-scroller
    div.fr-image-list
    div.fr-image-container
    .fr-insert-img {
    transition: background 0.2s ease 0s, color 0.2s ease 0s;
    box-shadow: none;
  }

  .universe-theme.fr-modal
    .fr-modal-wrapper
    div.fr-scroller
    div.fr-image-list
    div.fr-image-container
    .fr-delete-img {
    background: #b8312f;
    color: #ffffff;
  }

  .universe-theme.fr-modal
    .fr-modal-wrapper
    div.fr-scroller
    div.fr-image-list
    div.fr-image-container
    .fr-insert-img {
    background: #ffffff;
    color: #1e88e5;
  }

  .universe-theme.fr-modal.fr-desktop
    .fr-modal-wrapper
    .fr-modal-title
    .fr-modal-title-line
    i:hover {
    background: #ebebeb;
  }

  .universe-theme.fr-modal.fr-desktop
    .fr-modal-wrapper
    .fr-modal-title
    .fr-modal-tags
    a:hover {
    background: #ebebeb;
  }

  .universe-theme.fr-modal.fr-desktop
    .fr-modal-wrapper
    .fr-modal-title
    .fr-modal-tags
    a.fr-selected-tag {
    background: #d6d6d6;
  }

  .universe-theme.fr-modal.fr-desktop
    .fr-modal-wrapper
    div.fr-scroller
    div.fr-image-list
    div.fr-image-container
    .fr-delete-img:hover {
    background: #bf4644;
    color: #ffffff;
  }

  .universe-theme.fr-modal.fr-desktop
    .fr-modal-wrapper
    div.fr-scroller
    div.fr-image-list
    div.fr-image-container
    .fr-insert-img:hover {
    background: #ebebeb;
  }

  .universe-theme.fr-overlay {
    background: #0f1621;
  }

  .tribute-container {
    width: 200px;
    box-shadow: 0px 1px 4px rgba(186, 198, 208, 0.5),
      0px 1px 4px rgba(0, 157, 255, 0.05);
    border-radius: 4px;

    ul {
      background: ${white} !important;

      li {
        padding: 10px;

        &.highlight {
          background-color: ${focusColorHover} !important;
          color: ${gray01} !important;
        }
      }
    }
  }

  .user-mention {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    position: relative;

    .user-mention__avatar {
      width: 26px;
      height: 26px;
      border-radius: 100%;
      margin-right: 10px;
    }

    .user-mention__name p {
      font-size: 14px;
      margin: 0 auto;
    }
  }

  .hashtag {
    display: flex;
    flex-direction: row;

    .content {
      display: flex;
      flex-direction: column;
    }

    .new {
      display: flex;
      flex-grow: 1;
      justify-content: flex-end;
    }
  }
`;
