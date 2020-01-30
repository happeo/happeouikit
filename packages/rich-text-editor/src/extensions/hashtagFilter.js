export const aggregate = (query, hashtags) => {
  if (!hashtags || hashtags.length === 0) return null;

  if (hashtags.find(h => h.hashtag === query)) return hashtags;
  return [...hashtags, { hashtag: "#" + query, isNew: true }];
};

export const createHashtagUrl = (hashtag, type) => {
  const properHashtag = hashtag.indexOf("#") === 0 ? hashtag : `#${hashtag}`;
  const sanitizedHashtag = sanitiseHashtag(properHashtag);
  const uri = `/hashtags/${encodeURIComponent(
    sanitizedHashtag
  )}?source=${type}`;
  return `<a href="${uri}" class="hashtag fr-tribute" data-hashtag="${sanitizedHashtag}">${sanitizedHashtag}</a>`;
};

const toCamelCase = str =>
  str.replace(/(_|-|,|\.)(.)/g, (match, group1) => match[1].toUpperCase());

export const sanitiseHashtag = hashtag =>
  toCamelCase(hashtag).replace(/[^A-Za-z0-9\s]/g, "");
