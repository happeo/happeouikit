import styled, { css } from "styled-components";
import { gray01 } from "@happeokit/colors";

export const sansFamily = "'IBM Plex Sans', sans serif";
export const defaultColor = gray01;
const fontWeight = {
  bold: "500",
  regular: "400"
};

/**
 * Apply correct font-weight font
 * @param {Boolean} bold - shows whether the text should be bold or not
 */
function fW(bold) {
  return `font-weight: ${bold ? fontWeight.bold : fontWeight.regular};`;
}

const baseStyles = css`
  font-family: ${sansFamily};
  margin: 0;
  color: ${({ color }) => color || defaultColor};
  -webkit-font-smoothing: antialiased;
  ${({ bold }) => fW(bold)};
`;

// Title Mega
export const TextMega = styled.h1`
  ${baseStyles};
  font-size: 64px;
  letter-spacing: -2px;
  line-height: 80px;
`;

// Title XL
export const TextAlpha = styled.h1`
  ${baseStyles};
  font-size: 48px;
  letter-spacing: -1.5px;
  line-height: 64px;
`;

// Title L
export const TextBeta = styled.h1`
  ${baseStyles};
  font-size: 32px;
  letter-spacing: -0.75px;
  line-height: 40px;
`;

// Title M
export const TextGamma = styled.h2`
  ${baseStyles};
  font-size: 24px;
  ${({ bold }) => fW(bold)};
  letter-spacing: -0.5px;
  line-height: 32px;
`;

// Title S
export const TextDelta = styled.h2`
  ${baseStyles};
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0;
`;

export const TextEpsilon = styled.p`
  ${baseStyles};
  font-size: 18px;
  line-height: 26px;
  letter-spacing: 0;
`;

export const TextZeta = styled.p`
  ${baseStyles};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0;
`;

export const TextEta = styled.p`
  ${baseStyles};
  font-size: 14px;
  letter-spacing: 0;
  line-height: 20px;
`;

export const TextTheta = styled.p`
  ${baseStyles};
  font-size: 12px;
  letter-spacing: 0;
  line-height: 16px;
  text-transform: ${({ uppercase }) => (uppercase ? "uppercase" : "normal")};
`;

// Aliased for backwards compatibility
export const BodyUI = TextEta;
export const TinyText = TextTheta;
