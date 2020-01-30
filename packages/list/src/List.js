import styled from "styled-components";
import { white, bgGray } from "@happeokit/colors";
import { shadow200, screen } from "@happeokit/theme";

const LiBase = styled.li`
  display: flex;
  align-items: center;
  background: ${white};
  border-radius: 6px;

  @media ${screen.onlyXs} {
    flex-flow: wrap;
    border-radius: 0;
  }
`;

export const Li = styled(LiBase)`
  margin-bottom: 10px;
  padding: 16px 24px;
  box-shadow: 0 8px 14px 0 rgba(224, 229, 238, 0.5);

  :hover {
    box-shadow: 0 1px 4px 0 rgba(186, 198, 208, 0.5),
      0 1px 4px 0 rgba(0, 157, 255, 0.05);
  }

  ${({ stretch }) =>
    stretch &&
    `
     ${LiCol}:last-child {
       justify-content: flex-end;
     }
  `}
`;

export const LiStriped = styled(LiBase)`
  padding: 16px;

  &:nth-child(even),
  &:nth-child(even):hover {
    background: ${bgGray};
  }

  ${({ stretch }) =>
    stretch &&
    `
     ${LiCol}:last-child {
       justify-content: flex-end;
     }
  `}
`;

export const LiCol = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: ${({ width }) => width || "auto"};
  padding-right: ${({ padding }) => padding || "5px"};

  ${({ mobileHidden }) =>
    mobileHidden &&
    `
    @media ${screen.onlyXs} {
      display: none;
    }
  `}
`;

export const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const ListStripedContainer = styled(Ul)`
  padding: 24px;
  background: ${white};
  border-radius: 6px;
  box-shadow: ${shadow200};

  @media ${screen.onlyXs} {
    padding: 0;
    border-radius: 0;
    box-shadow: none;
  }
`;
