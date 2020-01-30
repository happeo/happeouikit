import React from "react";

const SvgIconFileBrokenFile = props => (
  <svg viewBox="0 0 24 32" width="1em" height="1em" {...props}>
    <defs>
      <linearGradient id="a" x1="0%" y1="0%" y2="100%">
        <stop stopOpacity={0.2} offset="0%" />
        <stop stopOpacity={0} offset="100%" />
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <path
        fill="#EC4B2F"
        d="M3 0h12l9 9v20a3 3 0 01-3 3H3a3 3 0 01-3-3V3a3 3 0 013-3z"
      />
      <path
        fill="#FFF"
        fillOpacity={0.4}
        d="M24 9h-6a3 3 0 01-3-3V0l9 9z"
        style={{ mixBlendMode: "lighten" }}
      />
      <path
        fill="url(#a)"
        d="M24 9h-6a2.991 2.991 0 01-2.159-.917c-.347-.36 2.373 2.28 8.159 7.917V9z"
        style={{ mixBlendMode: "hard-light" }}
      />
      <path
        fill="#FFF"
        d="M5.586 16l-1.414-1.414 1.414-1.414L7 14.586l1.414-1.414 1.414 1.414L8.414 16l1.414 1.414-1.414 1.414L7 17.414l-1.414 1.414-1.414-1.414L5.586 16zM9 24h6v2H9v-2zm6.586-8l-1.414-1.414 1.414-1.414L17 14.586l1.414-1.414 1.414 1.414L18.414 16l1.414 1.414-1.414 1.414L17 17.414l-1.414 1.414-1.414-1.414L15.586 16z"
      />
    </g>
  </svg>
);

export default SvgIconFileBrokenFile;
