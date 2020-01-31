import React, { useRef, forwardRef } from "react";

import { TagInput } from "./index";
import { sanitiseHashtag } from "./utils";
import { Button } from "@happeouikit/buttons";

const ForwardedTagInput = forwardRef((props, ref) => {
  return (
    <TagInput
      defaultValue={[
        { hashtag: "tag1", count: 100 },
        { hashtag: "tag2", count: 33 }
      ]}
      ref={ref}
      callback={tags => console.log(tags)}
    />
  );
});

export const InjectableTagInput = () => {
  const tagInputRef = useRef(null);
  const addHashtag = () => {
    const text = "injected_tag";
    tagInputRef.current.getWrappedInstance().addTag(text);
  };

  return (
    <>
      <Button
        onClick={addHashtag}
        text="click me to add a tag programatically"
      />
      <ForwardedTagInput ref={tagInputRef} />
    </>
  );
};

const getData = () => [
  { hashtag: "tag1", count: 100 },
  { hashtag: "tag2", count: 33 },
  { hashtag: "tag3", count: 3 },
  { hashtag: "#été_vlad__123.43", count: 3 },
  // { hashtag: "test", count: 1 },
  { hashtag: "#test", count: 1 }
];

export const loadOptions = async (inputValue, callback) => {
  setTimeout(() => {
    callback(getData());
  }, 1000);
};

const hashtags = [
  { hashtag: "tag1", count: 100 },
  { hashtag: "tag2", count: 33 },
  { hashtag: "tag3", count: 3 },
  { hashtag: "#été_vlad__123.43", count: 3 },
  // { hashtag: "test", count: 1 },
  { hashtag: "#test", count: 1, suggested: true }
];

const filterData = inputValue => {
  return hashtags.filter(i =>
    sanitiseHashtag(i.hashtag).includes(sanitiseHashtag(inputValue))
  );
};

export const promiseOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(filterData(inputValue));
    }, 1000);
  });

export const selectCallback = input => console.log("tags:", input);
