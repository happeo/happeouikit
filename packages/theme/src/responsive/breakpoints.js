// Break points
// ===========================
export const screenSize = {
  xs: "0px",
  xxsUp: "24rem",
  xsUp: "48rem",
  sm: "48.063rem",
  smUp: "62rem",
  md: "62.063rem",
  mdUp: "82rem",
  lg: "82.063rem",
  lgUp: "100rem",
  xl: "100rem",
  xlUp: "115.063rem",
  xxl: "115.063rem"
};

// screenSize size
// ===========================
export const screen = {
  minSm: `only screenSize and (min-width: ${screenSize.sm})`,
  minMd: `only screenSize and (min-width: ${screenSize.md})`,
  minLg: `only screenSize and (min-width: ${screenSize.lg})`,
  minXl: `only screenSize and (min-width: ${screenSize.xl})`,
  minXXl: `only screenSize and (min-width: ${screenSize.xxl})`,
  maxLg: `only screen and (max-width: ${screenSize.lgUp})`,
  onlyXxs: `(min-width: 0em) and (max-width: ${screenSize.xxsUp})`,
  onlyXs: `(min-width: 0em) and (max-width: ${screenSize.xsUp})`,
  onlySm: `(min-width: ${screenSize.sm}) and (max-width: ${screenSize.smUp})`,
  onlyMd: `(min-width: ${screenSize.md}) and (max-width: ${screenSize.mdUp})`,
  onlyLg: `(min-width: ${screenSize.lg}) and (max-width: ${screenSize.lgUp})`,
  onlyXl: `(min-width: ${screenSize.xl}) and (max-width: ${screenSize.xlUp})`,
  onlyXxl: `(min-width: ${screenSize.xxl})`
};

/**
 * Compare width to screen size by converting screenSize's rems to px
 * @param width
 * @param screenSize
 * @returns {boolean}
 */
const checkScreen = (width, screenSize) => {
  const rem = parseInt(screenSize, 10);
  return width > 0 && width < convertRemToPixels(rem);
};

export const isMobile = width => checkScreen(width, screenSize.xsUp);

// check for mobile + tablet screen sizes
export const isSm = width => checkScreen(width, screenSize.smUp);

const convertRemToPixels = rem => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};
