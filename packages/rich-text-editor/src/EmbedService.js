import React from "react";
import { renderToString } from "react-dom/server";
import xss from "xss";
import { api } from "@universe/frontend-utils";
import { BaseEmbed, VideoEmbed } from "./embedTemplates";
import { EMBED_TYPES, htmlWhitelist } from "./constants";
import { validateUrl } from "@universe/frontend-utils";

class EmbedService {
  constructor() {
    this.xss = new xss.FilterXSS({
      whiteList: htmlWhitelist.pagesAllowedTagsAndAttributes
    });
  }

  isGoogleUrl(url) {
    return url && url.includes("https://script.google.com/");
  }

  /**
   * Returns embed url for a given link
   * @param url
   */
  async getEmbedUrl(url) {
    try {
      const resp = await api.metaScraper.extract({ url });
      const { data } = resp.data;
      if (data && data.embedObject) {
        return data.embedObject.url;
      }
    } catch (e) {
      console.error(e);
      throw new Error("Failed to get embed");
    }
  }

  getEmbedHtml = async (content, type) => {
    switch (type) {
      case EMBED_TYPES.URL:
        if (validateUrl(content)) {
          try {
            const embedUrl = await this.getEmbedUrl(content);
            if (this.isGoogleUrl(embedUrl)) {
              return renderToString(<BaseEmbed src={embedUrl} />);
            } else {
              return renderToString(<VideoEmbed src={embedUrl} />);
            }
          } catch (e) {
            throw e;
          }
        }
        break;
      case EMBED_TYPES.CODE:
        // sanitize content
        return this.xss.process(content);
    }
  };
}

export default EmbedService;
