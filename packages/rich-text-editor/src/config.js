import React from "react";
import { renderToString } from "react-dom/server";
import {
  IconStrikethroughS,
  IconImageInline,
  IconImageWrap,
  IconFormatUnderlined,
  IconFormatListNumbered,
  IconFormatListBulleted,
  IconFormatIndentDecrease,
  IconFormatIndentIncrease,
  IconFormatClear,
  IconCode
} from "@happeokit/icons";
import {
  EDITOR_TYPES,
  LOCALE_TO_FROALA,
  htmlWhitelist,
  richEditorKey,
  MODAL_EVENTS,
  IS_BROWSER
} from "./constants";
import { trackEvent, events } from "@universe/analytics";
import { uploadConfig } from "./constants";
import { headers } from "@universe/frontend-utils";
import $ from "jquery";

if (IS_BROWSER) {
  window.$ = $;
}

function deepestParent(node) {
  while (
    !$(node)
      .parent()
      .hasClass("fr-element")
  ) {
    node = node.parentNode;
  }

  return node;
}

function removeImageAlignClasses(elem) {
  const classes = [
    "article-align-right",
    "article-align-center",
    "article-align-overflow",
    "no-resize",
    "article-align-left"
  ];

  $(elem).removeClass(classes.join(" "));
}

function clearResizer() {
  for (let node of document.querySelectorAll(
    ".fr-image-resizer, .fr-video-resizer"
  )) {
    node.classList.remove("fr-resize-denied");
    node.parentNode.removeChild(node);
  }
}

const customIcons = {
  pagesLink: {
    SVG_KEY: "insertLink",
    NAME: "Link"
  },
  paragraphFormat: { NAME: "Font style", template: "text" },
  videoAlignOverflow: {
    ICON: renderToString(<IconImageInline />),
    template: "react"
  },
  videoAlignCenter: {
    ICON: renderToString(<IconImageWrap />),
    template: "react"
  },
  clearFormatting: {
    ICON: renderToString(<IconFormatClear />),
    template: "react"
  }
};

const setupEditor = (editor, opts) => {
  const insertButtons = {
    videoEmbed: {
      icon: "insertVideo",
      title: "Video",
      callback: function() {
        const editor = this;
        editor.selection.save();
        const { toggle } = opts.embedModalOpts;
        window.addEventListener(MODAL_EVENTS.EMBED_CLOSE, e => {
          const { data } = e.detail;
          try {
            editor.video.insert(data, true);
            // Close embed modal
            toggle(false);
          } catch (e) {
            console.error(e);
          }
        });
        // Open embed modal
        toggle(true);
      }
    }
  };

  Object.keys(customIcons).forEach(key => {
    editor.DefineIcon(key, customIcons[key]);
  });

  const customCommands = {
    imageAlignLeft: {
      title: "Align image left",
      focus: false,
      undo: false,
      refreshAfterCallback: false,
      callback: function() {
        const $imgWrapper = this.image.get();
        const alignClass = "article-align-left";

        if ($imgWrapper.parent().hasClass("fr-img-wrap")) {
          const captionWrapper = $imgWrapper.parent().parent();
          removeImageAlignClasses($imgWrapper);
          removeImageAlignClasses(captionWrapper);
          captionWrapper.addClass(alignClass);
        } else {
          removeImageAlignClasses($imgWrapper);
          $imgWrapper.addClass(alignClass);
        }
        clearResizer();
      }
    },
    videoAlignCenter: {
      title: "Align video center",
      focus: false,
      undo: false,
      refreshAfterCallback: false,
      callback: function() {
        const $videoWrapper = this.video.get();
        const alignClass = "article-align-center";
        removeImageAlignClasses($videoWrapper);
        $videoWrapper.addClass(alignClass);
        clearResizer();
      }
    },
    imageAlignCenter: {
      title: "Align image center",
      focus: false,
      undo: false,
      refreshAfterCallback: false,
      callback: function() {
        const $imgWrapper = this.image.get();
        const alignClass = "article-align-center";

        if ($imgWrapper.parent().hasClass("fr-img-wrap")) {
          const captionWrapper = $imgWrapper.parent().parent();
          removeImageAlignClasses($imgWrapper);
          removeImageAlignClasses(captionWrapper);
          captionWrapper.addClass(alignClass);
        } else {
          removeImageAlignClasses($imgWrapper);
          $imgWrapper.addClass(alignClass);
        }
        clearResizer();
      }
    },
    imageAlignRight: {
      title: "Align image right",
      focus: false,
      undo: false,
      refreshAfterCallback: false,
      callback: function() {
        const $imgWrapper = this.image.get();
        const alignClass = "article-align-right";

        if ($imgWrapper.parent().hasClass("fr-img-wrap")) {
          const captionWrapper = $imgWrapper.parent().parent();
          removeImageAlignClasses($imgWrapper);
          removeImageAlignClasses(captionWrapper);
          captionWrapper.addClass(alignClass);
        } else {
          removeImageAlignClasses($imgWrapper);
          $imgWrapper.addClass(alignClass);
        }
        clearResizer();
      }
    },
    videoAlignOverflow: {
      title: "Video overflow",
      focus: false,
      undo: false,
      refreshAfterCallback: false,
      callback: function() {
        const $videoWrapper = this.video.get();
        const alignClass = "article-align-overflow";

        removeImageAlignClasses($videoWrapper);
        $videoWrapper.addClass(alignClass);
        clearResizer();
      }
    },
    imageAlignOverflow: {
      title: "Image overflow",
      focus: false,
      undo: false,
      refreshAfterCallback: false,
      callback: function() {
        const $imgWrapper = this.image.get();
        const alignClass = "article-align-overflow";

        if ($imgWrapper.parent().hasClass("fr-img-wrap")) {
          const captionWrapper = $imgWrapper.parent().parent();
          removeImageAlignClasses($imgWrapper);
          removeImageAlignClasses(captionWrapper);
          captionWrapper.addClass(alignClass);
          $imgWrapper.addClass("no-resize");
        } else {
          removeImageAlignClasses($imgWrapper);
          $imgWrapper.addClass(alignClass);
          $imgWrapper.addClass("no-resize");
        }
        clearResizer();
      }
    },
    pagesLink: {
      title: "Link",
      focus: true,
      undo: false,
      refreshAfterCallback: true,
      callback: function() {
        const editor = this;

        editor.selection.save();
        const { toggle } = opts.linkModalOpts;
        // Open modal
        toggle(true);

        // Listen for the close event from React modal
        window.addEventListener(MODAL_EVENTS.LINK_CLOSE, e => {
          const { data } = e.detail;
          const params =
            data.collectionId && data.id
              ? {
                  "data-collection-id": data.collectionId,
                  "data-page-id": data.id
                }
              : {};
          params.target = data.target ? "_blank" : undefined;
          try {
            editor.link.insert(data.url, data.text, params);
            // Close modal
            toggle(false);
          } catch (e) {
            console.error(e);
          }
        });
      }
    },

    quote: {
      title: "Quote",
      icon: "quote",
      undo: true,
      focus: true,
      showOnMobile: true,
      callback: function() {
        const selectedElem = this.selection.endElement();
        const deep = deepestParent(selectedElem);
        if (!deep) return;
        if (deep.tagName === "BLOCKQUOTE") {
          this.quote.apply("decrease");
        } else {
          this.quote.apply("increase");
        }
      }
    },
    formatLists: {
      title: "Format lists",
      type: "dropdown",
      icon: "formatUL",

      options: {
        bulletList: "Bullet list",
        numberList: "Numbered list"
      },
      html: function() {
        let c = '<ul class="fr-dropdown-list" role="presentation">';
        const options = {
          bulletList: {
            icon: renderToString(<IconFormatListBulleted />),
            label: "Bullet list"
          },
          numberList: {
            icon: renderToString(<IconFormatListNumbered />),
            label: "Numbered list"
          }
        };
        for (let val in options) {
          if (options.hasOwnProperty(val)) {
            c +=
              '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="formatText" data-param1="' +
              val +
              '" title="' +
              this.language.translate(options[val].label) +
              '">' +
              options[val].icon +
              "</a></li>";
          }
        }
        c += "</ul>";

        return c;
      },
      undo: true,
      focus: true,
      callback: function(cmd, val, params) {
        if (val === "bulletList") {
          this.lists.format("UL");
        } else if (val === "numberList") {
          this.lists.format("OL");
        }
      }
    },
    formatText: {
      title: "Format text",
      type: "dropdown",
      icon: "formatUL",

      options: {
        bulletList: "Bullet list",
        numberList: "Numbered list",
        increase: "Increase indent",
        decrease: "Decrease indent"
      },
      html: function() {
        let c = '<ul class="fr-dropdown-list" role="presentation">';
        const options = {
          bulletList: {
            icon: renderToString(<IconFormatListBulleted />),
            label: "Bullet list"
          },
          numberList: {
            icon: renderToString(<IconFormatListNumbered />),
            label: "Numbered list"
          },
          increase: {
            icon: renderToString(<IconFormatIndentIncrease />),
            label: "Increase indent"
          },
          decrease: {
            icon: renderToString(<IconFormatIndentDecrease />),
            label: "Decrease indent"
          }
        };
        for (let val in options) {
          if (options.hasOwnProperty(val)) {
            c +=
              '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="formatText" data-param1="' +
              val +
              '" title="' +
              this.language.translate(options[val].label) +
              '">' +
              options[val].icon +
              "</a></li>";
          }
        }
        c += "</ul>";

        return c;
      },
      undo: true,
      focus: true,
      callback: function(cmd, val) {
        switch (val) {
          case "bulletList":
            this.lists.format("UL");
            break;
          case "numberList":
            this.lists.format("OL");
            break;
          case "increase":
            this.commands.indent();
            break;
          case "decrease":
            this.commands.outdent();
        }
      }
    },
    more: {
      title: "More",
      type: "dropdown",
      icon: "moreMisc",
      options: {
        underline: "Underline",
        strikethrough: "Strikethrough",
        clear: "Clear stylings"
      },
      html: function() {
        let c = '<ul class="fr-dropdown-list" role="presentation">';
        const options = {
          underline: {
            icon: renderToString(<IconFormatUnderlined />),
            label: "Underline"
          },
          strikethrough: {
            icon: renderToString(<IconStrikethroughS />),
            label: "Strikethrough"
          },
          divider: {
            divider: true
          },
          clear: {
            icon: renderToString(<IconFormatClear />),
            label: "Clear styling"
          }
        };
        for (let val in options) {
          if (options.hasOwnProperty(val)) {
            if (options[val].divider) {
              c += '<li class="fr-dropdown-list--divider"></li>';
            } else {
              c +=
                '<li role="presentation"><a class="fr-command fr-dropdown-list--text" tabIndex="-1" role="option" data-cmd="more" data-param1="' +
                val +
                '" title="' +
                this.language.translate(options[val].label) +
                '">' +
                options[val].icon +
                "<span>" +
                this.language.translate(options[val].label) +
                "</span></a></li>";
            }
          }
        }
        c += "</ul>";

        return c;
      },
      undo: true,
      focus: true,
      callback: function(cmd, val) {
        if (val === "underline") {
          this.commands.underline();
        } else if (val === "strikethrough") {
          this.commands.strikeThrough();
        } else if (val === "clear") {
          this.commands.clearFormatting();
        } else if (val === "codeView") {
          trackEvent(events.EDITOR_TOGGLE_CODE_VIEW);
          this.codeView.toggle();
        }
      }
    },
    moreFull: {
      title: "More",
      type: "dropdown",
      icon: "moreMisc",
      options: {
        underline: "Underline",
        strikethrough: "Strikethrough",
        clear: "Clear stylings",
        codeView: "Code view"
      },
      html: function() {
        let c = '<ul class="fr-dropdown-list" role="presentation">';
        const options = {
          underline: {
            icon: renderToString(<IconFormatUnderlined />),
            label: "Underline"
          },
          strikethrough: {
            icon: renderToString(<IconStrikethroughS />),
            label: "Strikethrough"
          },
          codeView: {
            icon: renderToString(<IconCode />),
            label: "Code view"
          },
          divider: {
            divider: true
          },
          clear: {
            icon: renderToString(<IconFormatClear />),
            label: "Clear styling"
          }
        };
        for (let val in options) {
          if (options.hasOwnProperty(val)) {
            if (options[val].divider) {
              c += '<li class="fr-dropdown-list--divider"></li>';
            } else {
              c +=
                '<li role="presentation"><a class="fr-command fr-dropdown-list--text" tabIndex="-1" role="option" data-cmd="more" data-param1="' +
                val +
                '" title="' +
                this.language.translate(options[val].label) +
                '">' +
                options[val].icon +
                "<span>" +
                this.language.translate(options[val].label) +
                "</span></a></li>";
            }
          }
        }
        c += "</ul>";

        return c;
      },
      undo: true,
      focus: true,
      callback: function(cmd, val) {
        if (val === "underline") {
          this.commands.underline();
        } else if (val === "strikethrough") {
          this.commands.strikeThrough();
        } else if (val === "clear") {
          this.commands.clearFormatting();
        } else if (val === "codeView") {
          trackEvent(events.EDITOR_TOGGLE_CODE_VIEW);
          this.codeView.toggle();
        }
      }
    }
  };

  Object.keys(customCommands).forEach(key => {
    editor.RegisterCommand(key, customCommands[key]);
  });

  Object.keys(insertButtons).forEach(key => {
    editor.RegisterQuickInsertButton(key, insertButtons[key]);
  });

  editor.DefineIconTemplate("react", "[ICON]");
};

const editorBaseConf = {
  attribution: false,
  charCounterCount: false,
  key: richEditorKey,
  colorsDefaultTab: "text",
  emoticonsUseImage: false,
  linkConvertEmailAddress: false,
  lineBreakerTags: ["hr"],
  lineBreakerOffset: 20,
  tableResizerOffset: 10,
  tableResizingLimit: 50,
  colorsStep: 7,
  tableColorsStep: 7,
  colorsHEXInput: true,
  colorsButtons: [],
  theme: "universe",
  toolbarSticky: false,
  tableEditButtons: [
    "tableRows",
    "tableColumns",
    "tableCells",
    "tableStyle",
    "tableCellBackground",
    "tableCellVerticalAlign",
    "|",
    "tableRemove"
  ],
  linkEditButtons: ["linkOpen", "linkEdit", "linkRemove"],
  linkInsertButtons: [],
  tableColorsButtons: [],
  tableStyles: {
    "padded-1": "Medium padding",
    "padded-2": "Large padding",
    "no-borders": "No borders"
  },
  imageUploadParam: "file",
  imageUploadURL: uploadConfig.upload,
  requestHeaders: headers,
  tabSpaces: 4,
  imageUploadMethod: "POST",
  imageMaxSize: 10 * 1024 * 1024,
  imageResizeWithPercent: true,
  imageDefaultWidth: 0,
  imageEditButtons: [
    "imageLink",
    "linkEdit",
    "imageAlign",
    "imageDisplay",
    "imageAlt",
    "imageSize",
    "|",
    "imageRemove"
  ],
  imageInsertButtons: ["imageBack", "|", "imageUpload", "imageByURL"],
  imageAltButtons: [],
  imageSizeButtons: [],
  quickInsertButtons: [],
  quickInsertTags: [""]
};

const pagesButtons = [
  "paragraphFormat",
  "|",
  "pagesLink",
  "align",
  "bold",
  "italic",
  "color",
  "quote",
  "formatText",
  "|",
  "moreFull"
];

const articleButtons = [
  "paragraphFormat",
  "|",
  "insertLink",
  "align",
  "bold",
  "italic",
  "color",
  "quote",
  "formatText",
  "|",
  "more"
];

const quickInsert = {
  quickInsertButtons: ["image", "table", "ul", "ol", "hr"],
  quickInsertTags: [
    "p",
    "div",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "pre",
    "blockquote"
  ]
};

const pagesAllowedTags = {
  htmlAllowedTags: htmlWhitelist.pagesAllowedTags
};

const getLang = locale => {
  return LOCALE_TO_FROALA[locale];
};

export const getEditorConf = (editor, type, locale, opts = {}) => {
  setupEditor(editor, opts);
  const { paragraphFormat } = opts;
  let conf = editorBaseConf;
  conf.language = getLang(locale);

  switch (type) {
    case EDITOR_TYPES.FULL:
      return Object.assign({}, conf, pagesAllowedTags, quickInsert, {
        toolbarButtons: pagesButtons,
        toolbarButtonsSM: pagesButtons,
        toolbarButtonsMD: pagesButtons,
        toolbarButtonsXS: pagesButtons,
        paragraphFormat,
        toolbarInline: true,
        linkAlwaysBlank: false,
        initOnClick: true,
        heightMin: 20,
        heightMax: 999999,
        zIndex: 1,
        toolbarSticky: false,
        imagePaste: true
      });
    case EDITOR_TYPES.ARTICLE:
      return Object.assign({}, conf, pagesAllowedTags, quickInsert, {
        toolbarButtons: articleButtons,
        toolbarButtonsSM: articleButtons,
        toolbarButtonsMD: articleButtons,
        toolbarButtonsXS: articleButtons,
        paragraphFormat,
        toolbarInline: true,
        linkAlwaysBlank: true,
        initOnClick: true,
        heightMin: 20,
        heightMax: 999999,
        zIndex: 1,
        toolbarSticky: false,
        imagePaste: true,
        imageResize: true,
        imageEditButtons: ["imageAlign", "imageCaption", "imageRemove"],
        quickInsertButtons: ["image", "videoEmbed", "table", "ul", "ol", "hr"],
        videoEditButtons: [
          "videoAlignCenter",
          "videoAlignOverflow",
          "|",
          "videoRemove"
        ],
        videoResize: false
      });
    case EDITOR_TYPES.BARE:
      return Object.assign({}, conf, {
        toolbarButtons: [
          "paragraphFormat",
          "|",
          "bold",
          "italic",
          "align",
          "color",
          "|",
          "more"
        ],
        toolbarButtonsSM: [
          "paragraphFormat",
          "|",
          "bold",
          "italic",
          "align",
          "color",
          "|",
          "more"
        ],
        toolbarButtonsMD: [
          "paragraphFormat",
          "|",
          "bold",
          "italic",
          "align",
          "color",
          "|",
          "more"
        ],
        toolbarButtonsXS: [
          "paragraphFormat",
          "|",
          "bold",
          "italic",
          "align",
          "color",
          "|",
          "more"
        ],
        paragraphFormat,
        toolbarInline: true,
        initOnClick: true,
        heightMin: 20,
        zIndex: 0,
        pasteDeniedAttrs: ["class", "id", "style"],
        pasteDeniedTags: ["img", "script", "div"]
      });
    case EDITOR_TYPES.HERO:
      return Object.assign({}, conf, {
        placeholderText: "Header",
        toolbarButtons: ["bold", "italic", "color", "|", "more"],
        toolbarButtonsSM: ["bold", "italic", "color", "|", "more"],
        toolbarButtonsMD: ["bold", "italic", "color", "|", "more"],
        toolbarButtonsXS: ["bold", "italic", "color", "|", "more"],
        toolbarInline: true,
        initOnClick: false,
        heightMin: 30,
        heightMax: 300,
        zIndex: 200,
        pasteDeniedAttrs: ["class", "id", "style"],
        pasteDeniedTags: ["img", "script", "div"]
      });
    case EDITOR_TYPES.BANNER:
      return Object.assign({}, conf, {
        toolbarButtons: [
          "bold",
          "italic",
          "color",
          "align",
          "|",
          "fontSize",
          "|",
          "more"
        ],
        toolbarButtonsSM: [
          "bold",
          "italic",
          "color",
          "align",
          "|",
          "fontSize",
          "|",
          "more"
        ],
        toolbarButtonsMD: [
          "bold",
          "italic",
          "color",
          "align",
          "|",
          "fontSize",
          "|",
          "more"
        ],
        toolbarButtonsXS: [
          "bold",
          "italic",
          "color",
          "align",
          "|",
          "fontSize",
          "|",
          "more"
        ],
        toolbarInline: true,
        initOnClick: true,
        heightMin: 30,
        zIndex: 0,
        pasteDeniedAttrs: ["class", "id", "style"],
        pasteDeniedTags: ["img", "script", "div"]
      });
    case EDITOR_TYPES.POST:
      return Object.assign({}, conf, {
        toolbarButtons: [
          "paragraphFormat",
          "|",
          "insertLink",
          "bold",
          "italic",
          "underline",
          "textColor",
          "formatLists",
          "emoticons",
          "clearFormatting"
        ],
        toolbarButtonsMD: [
          "paragraphFormat",
          "|",
          "insertLink",
          "bold",
          "italic",
          "underline",
          "formatLists",
          "emoticons",
          "clearFormatting"
        ],
        toolbarButtonsSM: [
          "paragraphFormat",
          "|",
          "insertLink",
          "bold",
          "italic",
          "underline",
          "emoticons",
          "clearFormatting"
        ],
        toolbarButtonsXS: [
          "paragraphFormat",
          "|",
          "bold",
          "italic",
          "clearFormatting"
        ],
        paragraphFormat, //: delete paragraphFormat.H3,
        toolbarInline: false,
        heightMin: 20,
        heightMax: 600,
        zIndex: 2501,
        toolbarSticky: false,
        initOnClick: false,
        pastePlain: false,
        pasteDeniedAttrs: ["class", "id", "style", "alt"],
        pasteDeniedTags: ["script", "div"],
        linkAlwaysBlank: true,
        imagePaste: true,
        imageMove: true,
        imageResize: false,
        imageEditButtons: ["imageRemove"]
      });
    case EDITOR_TYPES.COMMENT:
      return Object.assign(
        {},
        conf,
        // postAllowedAttrs,
        {
          toolbarButtons: [
            "insertLink",
            "bold",
            "italic",
            "color",
            "underline",
            "formatLists",
            "|",
            "clearFormatting"
          ],
          toolbarButtonsMD: [
            "insertLink",
            "bold",
            "italic",
            "color",
            "underline",
            "formatLists",
            "|",
            "clearFormatting"
          ],
          toolbarButtonsSM: [
            "insertLink",
            "bold",
            "italic",
            "color",
            "underline",
            "|",
            "clearFormatting"
          ],
          toolbarButtonsXS: ["bold", "italic", "|", "clearFormatting"],
          toolbarInline: true,
          heightMin: 20,
          zIndex: 0,
          initOnClick: true,
          pastePlain: false,
          pasteDeniedAttrs: ["class", "id", "style", "alt"],
          pasteDeniedTags: ["script", "div", "span"],
          linkAlwaysBlank: true,
          imagePaste: true,
          imageMove: true,
          imageResize: false,
          imageEditButtons: ["imageRemove"]
        }
      );
    case EDITOR_TYPES.INLINE:
    default:
      return Object.assign({}, conf, {
        toolbarButtons: [
          "insertLink",
          "bold",
          "italic",
          "underline",
          "formatLists"
        ],
        toolbarButtonsMD: [
          "insertLink",
          "bold",
          "italic",
          "underline",
          "formatLists"
        ],
        toolbarButtonsSM: ["insertLink", "bold", "italic", "underline"],
        toolbarButtonsXS: ["insertLink", "bold", "italic"],
        linkConvertEmailAddress: true,
        toolbarInline: true,
        heightMin: 20,
        heightMax: 600,
        zIndex: 1,
        toolbarSticky: false,
        initOnClick: false,
        pastePlain: true,
        linkAlwaysBlank: true,
        imagePaste: false
      });
  }
};
