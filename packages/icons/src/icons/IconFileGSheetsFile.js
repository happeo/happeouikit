import React from "react";

const SvgIconFileGSheetsFile = props => (
  <svg viewBox="0 0 24 32" width="1em" height="1em" {...props}>
    <defs>
      <linearGradient id="a" x1="0%" y1="0%" y2="100%">
        <stop stopOpacity={0.2} offset="0%" />
        <stop stopOpacity={0} offset="100%" />
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <path
        fill="#0F9D58"
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
        fill="#F1F1F1"
        fillRule="nonzero"
        d="M6 15v10.875h12V15H6zm5.25 9.375H7.5V22.5h3.75v1.875zm0-3H7.5V19.5h3.75v1.875zm0-3H7.5V16.5h3.75v1.875zm5.25 6h-3.75V22.5h3.75v1.875zm0-3h-3.75V19.5h3.75v1.875zm0-3h-3.75V16.5h3.75v1.875z"
      />
    </g>
  </svg>
);

export default SvgIconFileGSheetsFile;
