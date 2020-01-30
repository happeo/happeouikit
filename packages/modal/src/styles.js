import { createGlobalStyle, css } from "styled-components";
import { black30 } from "@happeokit/colors";

export const OverlayStyle = createGlobalStyle`
  .ReactModal__Body--open {
    overflow-y: hidden;
  }
  .Overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: ${black30};
    z-index: 1049;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
  }
`;
