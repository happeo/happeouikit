import styled from "styled-components";
import { active, toBgLight, white } from "@happeouikit/colors";
import { Ul } from "@happeouikit/list";

export const Wrapper = styled.div`
  position: relative;
`;

export const Container = styled(Ul)`
  display: block;
  position: absolute;
  top: 46px;
  ${({ menuPosition }) => {
    if (menuPosition === "left") {
      return "right: 0;";
    } else {
      return "left: 0;";
    }
  }};

  background: ${white};
  min-width: ${({ menuWidth }) => menuWidth || "200px"};
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  z-index: 1;
`;

export const ActionRow = styled.li`
  cursor: pointer;
  padding: 10px 16px;

  :hover {
    background-color: ${toBgLight(active)};
  }
  &:first-child:hover {
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
  }

  &:last-child:hover {
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
  }
`;
