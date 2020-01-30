import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { TextBeta, TextZeta } from "@happeokit/typography";
import { active, gray07, gray05 } from "@happeokit/colors";
import { NavLink } from "react-router-dom";
/**
 * Navbar for a page with page title and navigation tabs
 */
const TabNav = ({ pageTitle, tabs }) => {
  return (
    <Container hasTabs={!!tabs.length}>
      {pageTitle && <TextBeta>{pageTitle}</TextBeta>}
      {tabs.length ? (
        <TabGroup>
          {tabs.map((tab, i) => (
            <NavTab to={tab.url} key={i} exact={tab.exact}>
              <TextZeta color="inherit">{tab.name}</TextZeta>
            </NavTab>
          ))}
        </TabGroup>
      ) : null}
    </Container>
  );
};

TabNav.propTypes = {
  pageTitle: PropTypes.any,
  tabs: PropTypes.array
};

TabNav.defaultProps = {
  pageTitle: "",
  tabs: []
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid ${gray07};
  padding-bottom: ${({ hasTabs }) => (hasTabs ? "0" : "8px")};
`;

const TabGroup = styled.div`
  display: flex;
  margin-top: 20px;
`;

const NavTab = styled(NavLink)`
  color: ${gray05};
  text-decoration: none;
  padding-bottom: 8px;

  &.active,
  &:hover {
    color: ${active};
    padding-bottom: 4px;
    border-bottom: 4px solid ${active};
  }

  &:not(:first-child) {
    margin-left: 20px;
  }
`;

export default TabNav;
