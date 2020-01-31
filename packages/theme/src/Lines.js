import styled from "styled-components";
import { gray08 } from "@happeouikit/colors";

const BaseLine = styled.div`
  width: 100%;
  background-color: ${gray08};
`;

export const Line300 = styled(BaseLine)`
  height: 1px;
`;

export const Line400 = styled(BaseLine)`
  height: 2px;
`;

export const Line600 = styled(BaseLine)`
  height: 4px;
`;
