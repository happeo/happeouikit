import React from "react";
import styled from "styled-components";
import { GiphyPickerContext } from "./context";
import { active } from "@happeokit/colors";

const GiphyList = ({ gifs }) => {
  if (!gifs || gifs.length === 0) return null;

  return gifs.map((gif, i) => (
    <StyledGiphyContainer key={i}>
      <GiphyPickerContext.Consumer>
        {select => (
          <StyledGiphy
            gifUrl={gif.images.fixed_width_downsampled.url}
            onClick={() => select(gif)}
          ></StyledGiphy>
        )}
      </GiphyPickerContext.Consumer>
    </StyledGiphyContainer>
  ));
};
export default GiphyList;

const StyledGiphy = styled.a`
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 2px;
  background-size: cover;
  background-position: 50% 50%;
  background-image: ${({ gifUrl }) => `url("${gifUrl}")`};
  border: 2px solid transparent;

  :hover {
    border: 2px solid ${active};
  }
`;

const StyledGiphyContainer = styled.div`
  height: 84px;
  padding: 7px;
  width: 33.3333%;
  box-sizing: border-box;
`;
