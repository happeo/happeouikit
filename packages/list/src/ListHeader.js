import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { IconArrowDropDown, IconArrowDropUp } from "@happeokit/icons";
import { TextZeta } from "@happeokit/typography";
import { LiStriped, LiCol } from "./List";
import { active, gray01 } from "@happeokit/colors";
import { screen } from "@happeokit/theme";

const ListHeader = ({ headers, sortDir, sortField, sortFn, padding }) => {
  return (
    <HeaderRow>
      {headers.map((header, i) => {
        const color =
          sortField === header.field && header.sortable ? active : gray01;
        return (
          <LiCol
            mobileHidden={header.mobileHidden}
            width={header.width}
            key={i}
            onClick={header.sortable ? () => sortFn(header.field) : null}
            padding={padding}
          >
            <TextZeta bold color={color}>
              {header.name}
            </TextZeta>
            <HeaderIcon
              color={color}
              sortDir={sortDir}
              isSorted={sortField === header.field}
              sortable={header.sortable}
            />
          </LiCol>
        );
      })}
    </HeaderRow>
  );
};

const HeaderIcon = ({ sortDir, sortable, isSorted, color }) => {
  const iconProps = {
    width: "24px",
    height: "21px",
    fill: color
  };

  return sortable ? (
    !sortDir.includes("desc") && isSorted ? (
      <IconArrowDropUp {...iconProps} />
    ) : (
      <IconArrowDropDown {...iconProps} />
    )
  ) : null;
};

ListHeader.propTypes = {
  headers: PropTypes.array.isRequired,
  sortDir: PropTypes.string,
  sortFn: PropTypes.func
};

ListHeader.defaultProps = {
  sortDir: "desc"
};

const HeaderRow = styled(LiStriped)`
  justify-content: flex-start;
  background: transparent;
  box-shadow: none;

  @media ${screen.onlyXs} {
    justify-content: space-between;
  }
`;

export default ListHeader;
