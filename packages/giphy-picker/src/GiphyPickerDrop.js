import React, { Component } from "react";
import Search from "./Search";
import styled from "styled-components";
import { white } from "@happeokit/colors";
import Content from "./Content";
import debounce from 'lodash.debounce';

export default class GiphyDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: ""
    };
    this.debouncedSearch = debounce(this.search, 250);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    this.debouncedSearch.cancel();
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleClickOutside = event => {
    event.stopPropagation();
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.onClose();
    }
  };

  searchChanged = e => {
    e.persist();
    this.debouncedSearch(e);
  };

  search = e => {
    this.setState({ searchString: e.target.value });
  };

  render = () => {
    const { searchString } = this.state;
    return (
      <Container ref={this.setWrapperRef}>
        <Search onChange={this.searchChanged} />
        <Content query={searchString} />
      </Container>
    );
  };
}

const Container = styled.div`
  width: 324px;
  height: 408px;
  display: flex;
  flex-direction: column;
  background: ${white};
  box-shadow: 0px 12px 32px rgba(33, 41, 53, 0.5);
  border-radius: 6px;
`;
