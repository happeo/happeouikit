import React from "react";
import { 
  shortToUnicode,
  emojisToShort,
  removeEmojis } from "./Emojis";

const EmojiExample = () => {
  const text = "This is emoji with short hand :smile: converted to unicode";
  const renderText = shortToUnicode(text);

  const text2 = "This is unicode 😄 converted to short hand";
  const renderText2 = emojisToShort(text2);

  const text3 = "This is 😄 has emojis 😄 and they will be removed 😄";
  const renderText3 = removeEmojis(text3);
  return (
    <div>      
      <p>{renderText}</p>
      <p>{renderText2}</p>
      <p>{renderText3}</p>
    </div>
  );
};

export default EmojiExample;
