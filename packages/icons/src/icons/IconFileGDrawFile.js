import React from "react";

const SvgIconFileGDrawFile = props => (
  <svg
    viewBox="0 0 24 32"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="1em"
    height="1em"
    {...props}
  >
    <defs>
      <linearGradient id="c" x1="0%" y1="0%" y2="100%">
        <stop stopOpacity={0.2} offset="0%" />
        <stop stopOpacity={0} offset="100%" />
      </linearGradient>
      <filter
        id="a"
        width="133.3%"
        height="133.3%"
        x="-16.7%"
        y="-16.7%"
        filterUnits="objectBoundingBox"
      >
        <feOffset in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur
          stdDeviation={0.5}
          in="shadowOffsetOuter1"
          result="shadowBlurOuter1"
        />
        <feComposite
          in="shadowBlurOuter1"
          in2="SourceAlpha"
          operator="out"
          result="shadowBlurOuter1"
        />
        <feColorMatrix
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          in="shadowBlurOuter1"
        />
      </filter>
      <path id="b" d="M24 9h-6a3 3 0 01-3-3V0l9 9z" />
    </defs>
    <g fill="none" fillRule="evenodd">
      <path
        fill="#DB4437"
        d="M3 0h12l9 9v20a3 3 0 01-3 3H3a3 3 0 01-3-3V3a3 3 0 013-3z"
      />
      <use fill="#000" filter="url(#a)" xlinkHref="#b" />
      <use
        fill="#FFF"
        fillOpacity={0.4}
        style={{ mixBlendMode: "lighten" }}
        xlinkHref="#b"
      />
      <path
        fill="url(#c)"
        d="M24 9h-6a2.991 2.991 0 01-2.159-.917c-.347-.36 2.373 2.28 8.159 7.917V9z"
        style={{ mixBlendMode: "hard-light" }}
      />
      <path
        fill="#F1F1F1"
        fillRule="nonzero"
        d="M13.333 17.667a3.667 3.667 0 10-7.333 0 3.667 3.667 0 007.333 0zM9.667 20a2.336 2.336 0 01-2.334-2.333 2.336 2.336 0 012.334-2.334A2.336 2.336 0 0112 17.667 2.336 2.336 0 019.667 20zm4.715-.667A5.01 5.01 0 0112 22.088v3.245h6v-6h-3.618z"
      />
    </g>
  </svg>
);

export default SvgIconFileGDrawFile;
