// TODO Figure out how to share this across packages
export const ASSETS_ROOT = "https://cdn.happeo.com/misc";

export const LOCALE_TO_FROALA = {
  "fi-FI": "fi",
  "en-US": "en-us",
  "fr-FR": "fr",
  "sv-SE": "sv",
  "es-ES": "es",
  "ja-JP": "ja",
  "it-IT": "it",
  "nl-NL": "nl",
  "no-NO": "nb"
};

export const EDITOR_TYPES = {
  FULL: "full",
  ARTICLE: "article",
  BARE: "bare",
  HERO: "hero",
  BANNER: "banner",
  POST: "post",
  COMMENT: "comment",
  INLINE: "inline"
};

export const richEditorKey =
  "Ig1A7vB3D3D3B2sGXh1WWTDSGXYOUKc1KINLe1OC1c1D-17D2E2B1B2E4F1B2B8C7A6==";

export const customClasses = {
  [EDITOR_TYPES.ARTICLE]: "article-body markdown"
};

export const EMBED_TYPES = { CODE: "code", URL: "url" };
export const MODAL_EVENTS = {
  EMBED_CLOSE: "embed_modal_close",
  LINK_CLOSE: "page_link_modal_close"
};
// Global settings
const settings = (typeof window !== "undefined" && window.settings) || {};
if (!settings.env) settings.env = "local";

export const ROOT = settings.env === "local" ? "https://staging.unvrs.io" : "";
let CDN_PATH = "//cdn.happeo.com";
if (settings.env === "staging") {
  CDN_PATH = "//cdn-b.happeo.com";
} else if (settings.env === "local") {
  CDN_PATH = "";
}

export const uploadConfig = {
  upload: ROOT + "/api/images/upload",
  get: ROOT + "/api/images/image"
};

export const htmlWhitelist = {
  postAllowedTags: [
    "a",
    "br",
    "div",
    "em",
    "font",
    "h1",
    "h2",
    "h3",
    "hr",
    "i",
    "u",
    "img",
    "li",
    "ol",
    "p",
    "span",
    "strong",
    "ul",
    "ol",
    "user-mentio",
    "code",
    "pre",
    "del",
    "table",
    "th",
    "td",
    "tr"
  ],
  postAllowedAttrs: [
    "class",
    "data",
    "data-.*",
    "height",
    "href",
    "id",
    "src",
    "style",
    "target",
    "width"
  ],
  postAllowedTagsAndAttributesToPost: {
    a: ["href"], // Links
    u: [], // Underline text
    span: ["style"] // Used for coloring text, all other tags use markdown
  },
  postAllowedTagsAndAttributesToDraw: {
    p: [], // Normal tags
    h1: [], // header 1
    h2: [], // header 2
    ul: [], // Unordered list
    ol: [], // Ordered list
    li: [], // list item
    b: [], // bold
    strong: [], // bold
    hr: [], // Divider
    em: [], // Italic
    u: [], // Underline
    a: ["href", "target"], // Links
    img: ["src", "style"], // Images and emoticons
    span: ["style"], // Used for coloring text, all other tags use markdown
    "user-mentio": ["data-user-id", "data-user-id-old"], // User mentions
    code: ["class"], // For code snippets
    pre: [],
    del: [],
    table: [],
    td: [],
    tr: [],
    th: []
  },
  pagesAllowedTags: [
    "a",
    "abbr",
    "address",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "bdi",
    "bdo",
    "big",
    "blockquote",
    "br",
    "caption",
    "center",
    "cite",
    "code",
    "col",
    "colgroup",
    "dd",
    "del",
    "details",
    "div",
    "dl",
    "dt",
    "em",
    "font",
    "footer",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "hr",
    "i",
    "img",
    "ins",
    "li",
    "mark",
    "nav",
    "ol",
    "p",
    "pre",
    "s",
    "section",
    "small",
    "span",
    "sub",
    "sup",
    "strong",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "tr",
    "tt",
    "u",
    "ul",
    "video",
    "iframe",
    "user-mentio"
  ],
  pagesAllowedTagsAndAttributes: {
    a: ["target", "href", "title", "data-collection-id", "data-page-id", "rel"],
    abbr: ["title"],
    address: [],
    area: ["shape", "coords", "href", "alt"],
    article: [],
    aside: [],
    audio: ["autoplay", "controls", "loop", "preload", "src"],
    b: [],
    bdi: ["dir"],
    bdo: ["dir"],
    big: [],
    blockquote: ["cite"],
    br: [],
    caption: [],
    center: [],
    cite: [],
    code: [],
    col: ["align", "valign", "span", "width"],
    colgroup: ["align", "valign", "span", "width"],
    dd: [],
    del: ["datetime"],
    details: ["open"],
    div: ["style"],
    dl: [],
    dt: [],
    em: [],
    font: ["color", "size", "face", "style"],
    footer: [],
    h1: ["style"],
    h2: ["style"],
    h3: ["style"],
    h4: ["style"],
    h5: ["style"],
    h6: ["style"],
    header: ["style"],
    hr: ["style", "class"],
    i: [],
    img: ["src", "alt", "title", "width", "height", "style", "class"],
    ins: ["datetime"],
    li: ["style"],
    mark: [],
    nav: [],
    ol: ["style"],
    p: ["style"],
    pre: ["style"],
    s: [],
    section: [],
    small: [],
    span: ["style", "class"],
    sub: [],
    sup: [],
    strong: [],
    table: ["width", "border", "align", "valign", "style", "class"],
    tbody: ["align", "valign", "style", "class"],
    td: ["width", "rowspan", "colspan", "align", "valign", "style", "class"],
    tfoot: ["align", "valign", "style", "class"],
    th: ["width", "rowspan", "colspan", "align", "valign", "style", "class"],
    thead: ["align", "valign", "style", "class"],
    tr: ["rowspan", "align", "valign", "style", "class"],
    tt: [],
    u: [],
    ul: ["style", "class"],
    video: [
      "style",
      "autoplay",
      "controls",
      "loop",
      "preload",
      "src",
      "height",
      "width"
    ],
    iframe: [
      "src",
      "frameborder",
      "allow",
      "sandbox",
      "referrerpolicy",
      "allowfullscreen",
      "style",
      "class"
    ],
    "user-mentio": ["data-user-id", "data-user-id-old"] // User mentions
  }
};

export const IS_BROWSER =
  typeof window !== "undefined" && typeof document !== "undefined";
