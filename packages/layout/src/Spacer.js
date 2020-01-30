import styled from "styled-components";

export const Spacer = styled.div`
  height: ${({ height }) => height || "16px"};
  width: ${({ width }) => width || "16px"};
`;