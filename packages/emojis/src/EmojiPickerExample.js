import React, { useState } from "react";
import EmojiPicker from "./EmojiPicker";

export const EmojiPickerExample = () => {
  const [inputValue, setInputValue] = useState("");
  const displayedValue = inputValue ? (
    <div>You have selected: {inputValue}</div>
  ) : null;

  return (
    <div>
      <p>Click the emoji picker to select an emoji</p>
      <EmojiPicker
        onSelected={emoji => setInputValue(emoji.native)}
        customEmojis={[
          {
            name: "Octocat",
            short_names: ["octocat"],
            text: "",
            emoticons: [],
            keywords: ["github"],
            imageUrl:
              "https://github.githubassets.com/images/icons/emoji/octocat.png"
          },
          {
            name: "Happeo",
            short_names: ["happeo"],
            text: "",
            emoticons: [],
            keywords: ["happeo"],
            imageUrl: "https://cdn.getuniverse.com/assets/img/favicon.png"
          }
        ]}
      />
      {displayedValue}
    </div>
  );
};
