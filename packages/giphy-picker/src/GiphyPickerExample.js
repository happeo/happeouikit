import React, { useState } from "react";
import GiphyPicker from "./GiphyPicker";

export const GiphyPickerExample = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <p>Click the giphy picker to select an gif</p>
      <GiphyPicker
        onSelected={gif =>
          setInputValue(gif.images.fixed_width_downsampled.url)
        }
      />
      {inputValue && (
        <img src={inputValue} width="200px" height="200px" alt="Gif" />
      )}
    </div>
  );
};
