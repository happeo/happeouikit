import React from "react";
import { ListHeader, LiCol, LiStriped, Li } from "./index";
import { BodyUI } from "@happeokit/typography";

const headers = [
  { name: "", width: "5%" },
  { name: "Name", sortable: true, field: "name", width: "30%" },
  { name: "User", sortable: true, field: "user", width: "25%" },
  { name: "Header 1", sortable: false, width: "25%", mobileHidden: true },
  { name: "Header 2", field: "header2", sortable: true, width: "15%" }
];

export const HeaderWithData = props => {
  return (
    <ListHeader
      headers={headers}
      sortDir={"desc"}
      sortField="name"
      sortFn={() => ""}
    />
  );
};

const items = [
  { name: "Test column", owner: "User name" },
  { name: "Test column", owner: "User name" },
  { name: "Test column", owner: "User name" },
  { name: "Test column", owner: "User name" },
  { name: "Test column", owner: "User name" }
];

export const LiStripedWithData = () => {
  return items.map((item, i) => {
    return (
      <LiStriped key={i}>
        <LiCol width="5%" mobileHidden>
          <input type="checkbox" />
        </LiCol>
        <LiCol width="30%">
          <BodyUI>{item.name}</BodyUI>
        </LiCol>
        <LiCol width="25%">
          <BodyUI>{item.owner}</BodyUI>
        </LiCol>
        <LiCol width="25%">
          <BodyUI>Content 1 </BodyUI>
        </LiCol>
        <LiCol width="15%">
          <BodyUI>Content 2</BodyUI>
        </LiCol>
      </LiStriped>
    );
  });
};

export const LiWithData = () => {
  return items.map((item, i) => {
    return (
      <Li key={i}>
        <LiCol width="5%">
          <input type="checkbox" />
        </LiCol>
        <LiCol width="30%">
          <BodyUI>{item.name}</BodyUI>
          <BodyUI>100</BodyUI>
        </LiCol>
        <LiCol width="25%">
          <BodyUI>{item.owner}</BodyUI>
        </LiCol>
        <LiCol width="25%">
          <BodyUI>Content 1 </BodyUI>
        </LiCol>
        <LiCol width="15%">
          <BodyUI>Content 2</BodyUI>
        </LiCol>
      </Li>
    );
  });
};
