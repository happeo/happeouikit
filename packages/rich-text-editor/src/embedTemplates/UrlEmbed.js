import React from "react";
import { BaseEmbed } from "./index";

const UrlEmbed = ({ src }) => {
  return (
    <BaseEmbed
      src={src}
      allow="autoplay; encrypted-media"
      sandbox="allow-forms allow-scripts allow-presentation allow-popups allow-same-origin"
    />
  );
};

export default UrlEmbed;
