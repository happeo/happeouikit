import React from "react";
import { BaseEmbed } from "./index";

const VideoEmbed = ({ src }) => {
  return <BaseEmbed src={src} allow="autoplay; encrypted-media" />;
};

export default VideoEmbed;
