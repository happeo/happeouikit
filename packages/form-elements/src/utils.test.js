import { addHashSign, sanitiseHashtag } from "./utils";

describe("addHashSign", () => {
  const tag = "tag";
  const hashtag = "#tag";

  test("should add a #", () => {
    expect(addHashSign(tag)).toEqual(hashtag);
  });

  test("should not add a #", () => {
    expect(addHashSign(hashtag)).toEqual(hashtag);
  });
});

describe("sanitiseHashtag", () => {
  test("should return empty string if hashtag not an object", () => {
    expect(sanitiseHashtag({})).toEqual("");
  });

  test("should remove multiple consecutive _", () => {
    expect(sanitiseHashtag("__abc__def__")).toEqual("#_abc_def_");
  });

  test("should remove non hashtag specific characters", () => {
    expect(sanitiseHashtag("__abc*123-@#$%__def__")).toEqual("#_abc");
  });

  test("should work with characters from different languages", () => {
    expect(sanitiseHashtag("#été")).toEqual("#été");
    expect(sanitiseHashtag("#キャンパス写真好きな人と繋がりたい")).toEqual(
      "#キャンパス写真好きな人と繋がりたい"
    );
    expect(sanitiseHashtag("αλφαβητικόςбиологическомtükörfúrógépﬃßıi")).toEqual(
      "#αλφαβητικόςбиологическомtükörfúrógépﬃßıi"
    );
  });

  test("should only record the first 64 characters", () => {
    const longHashtag = "#21chars_long_hashtag".repeat(10);
    const sanitisedHashtag = sanitiseHashtag(longHashtag);

    expect(sanitisedHashtag.length).toBe(64);
  });
});
