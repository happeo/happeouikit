import React from "react";
import styled from "styled-components";
// IMPORTANT!
// In the docs thing we currently cannot use components that are in the library, so no typography or color packages..

const gray08 = "#e8ecf2"; // Not yet possible to be used with the happeokit
const padding600 = "32px";

const BackgroundBox = styled.div`
  border-radius: 4px;
  background-color: ${gray08};
  padding: ${padding600};
`;

export default BackgroundBox;
