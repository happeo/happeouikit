import React from "react";
import ReactDOMServer from "react-dom/server";
import { BodyUI } from "@happeokit/typography";
import { active } from "@happeokit/colors";
import { ButtonPrimary } from "@happeokit/buttons";
import { IconAddCircle } from "@happeokit/icons";
import { aggregate, createHashtagUrl, sanitiseHashtag } from "./hashtagFilter";
import debounce from "lodash.debounce";

const getConfig = ({ searchHashtags, createHashtag, type }) => ({
  trigger: "#",
  menuItemTemplate: item => {
    const { hashtag, count, isNew } = item.original;
    const sanitizedHashtag = sanitiseHashtag(hashtag);

    if (isNew)
      return [
        '<a class="hashtag">',
        '<div class="content">',
        ReactDOMServer.renderToString(
          <BodyUI style={{ color: active }}>{sanitizedHashtag}</BodyUI>
        ),
        ReactDOMServer.renderToString(<BodyUI>Add this hashtag</BodyUI>),
        "</div>",
        '<div class="new">',
        ReactDOMServer.renderToString(<ButtonPrimary icon={IconAddCircle} />),
        "</div>",
        "</a>"
      ].join("");

    const usage = `Used ${count} ${count === 1 ? "time" : "times"}`;
    return [
      '<a className="hashtag">',
      '<div class="content">',
      ReactDOMServer.renderToString(
        <BodyUI style={{ color: active }}>{sanitizedHashtag}</BodyUI>
      ),
      ReactDOMServer.renderToString(<BodyUI>{usage}</BodyUI>),
      "</a>"
    ].join("");
  },
  selectTemplate: item => {
    const { hashtag, isNew } = item.original;
    const sanitizedHashtag = sanitiseHashtag(hashtag);
    if (isNew) createHashtag(sanitizedHashtag);

    return createHashtagUrl(sanitizedHashtag, type);
  },
  lookup: "hashtag",
  values: async (query, cb) => {
    if (query.length > 0) {
      try {
        debounce(async query => {
          const hashtags = await searchHashtags(query);
          const aggregatedHashtags = aggregate(query, hashtags);
          cb(aggregatedHashtags);
        }, 200)(query);
      } catch (e) {
        console.error("Error searching hashtags", e);
      }
    }
  }
});

export default getConfig;
