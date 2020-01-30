import React from "react";

const SvgIconFileGeneralFile = props => (
  <svg viewBox="0 0 24 32" width="1em" height="1em" {...props}>
    <defs>
      <linearGradient id="a" x1="0%" y1="0%" y2="100%">
        <stop stopOpacity={0.2} offset="0%" />
        <stop stopOpacity={0} offset="100%" />
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <path
        fill="#00A4E9"
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
        d="M9 24h6v2H9v-2zm-2-6a2 2 0 110-4 2 2 0 010 4zm10 0a2 2 0 110-4 2 2 0 010 4z"
      />
    </g>
  </svg>
);

export default SvgIconFileGeneralFile;
