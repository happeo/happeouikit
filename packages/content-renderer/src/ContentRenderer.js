/**
 *
 * ContentRenderer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BodyUI } from "@happeokit/typography";
import { active } from "@happeokit/colors";
import { toHtml, toSafeText } from "./utils";

const ContentRenderer = ({ content, type }) => {
  let transformedContent = toHtml(content, type);
  if (type === "text") {
    transformedContent = `<p>${transformedContent}</p>`;
  }
  const safeText = toSafeText(transformedContent);

  // Use dangerouslySetInnerHTML as there might be nested <p>'s header etc
  // This requires that all content is run through the toSafeText filter
  // before displaying. This will run it through xss filter.
  return (
    <Wrapper dangerouslySetInnerHTML={{
      __html: safeText
    }} />
  );
}

const Wrapper = styled(BodyUI).attrs({as: 'div'})`
  h1 {
    font-weight: bold;
    font-size: 24px;
    letter-spacing: -0.9px;
    line-height: 32px;
    + h1, h2, h3, h4, p {
      margin-top: 14px;
    }
  }
  h2 {
    font-weight: bold;
    font-size: 20px;
    letter-spacing: -0.9px;
    line-height: 28px;
    + h1, h2, h3, h4, p {
      margin-top: 14px;
    }
  }
  h3 {
    font-weight: bold;
    font-size: 16px;
    letter-spacing: -0.4px;
    line-height: 20px;
    + h1, h2, h3, h4, p {
      margin-top: 14px;
    }
  }
  h4 {
    font-size: 16px;
    letter-spacing: -0.4px;
    line-height: 24px
    + h1, h2, h3, h4, p {
      margin-top: 14px;
    }
  }
  p {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.25px;
    + h1, h2, h3, h4, p {
      margin-top: 14px;
    }
  }
  a {
    color: ${active};
    font-weight: bold;
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
  ul {
    list-style-type: disc;
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
    display: block;
    -webkit-margin-before: 0.5em;
    -webkit-margin-after: 0.5em;
    -webkit-padding-start: 0.5em;
    list-style-position: inside;
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
  hr {
    -webkit-margin-before: 16px;
    -webkit-margin-after: 13px;
    border-color: @border-color;
    border-style: solid;
    height: 0px;
    border-width: 1px 0 0 0;
  }
  table {
    width: 100%;
    margin: 15px 0;
    text-align: left;
    thead th {
      background: @white;
    }
    th,
    td {
      border-width: 1px;
      border-style: solid;
      border-color: @border-color;
      padding: 0.5em;
    }
    tr:nth-child(even) {
      background: @almost-white;
    }
    tr:nth-child(odd) {
      background: @white;
    }    
  }
  table.no-borders {
    th,
    td {
      border: none;
    }
  }
  table.padded-2 {
    th,
    td {
      padding: 2em;
    }
  }
  table.padded-1 {
    th,
    td {
      padding: 1em;
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
  pre {
    position: relative;
    background-color: @almost-white;
    padding: 1em;
    margin: 1em 0;
    border-radius: 4px;
    white-space: pre;
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

`;

ContentRenderer.propTypes = {
  content: PropTypes.string,
  type: PropTypes.string
};

ContentRenderer.defaultProps = {
  content: "",
  type: "html"
};

export default ContentRenderer;