import React from "react";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";
import { api, makeCancelable } from "@universe/frontend-utils";
import GiphyList from "./GiphyList";
import { Loader } from "@happeokit/loaders";
import Error from "./Error";
import debounce from 'lodash.debounce';

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.searchGiphyDebounced = debounce(this.searchGiphy, 750);
    this.state = {
      gifs: [],
      error: false,
      pageNumber: 0,
      loading: false
    };
  }

  componentDidMount = () => {
    this.searchGiphy();
  };

  componentWillUnmount = () => {
    this.cancelableSearchPromise && this.cancelableSearchPromise.cancel();
  };

  componentDidUpdate = prevProps => {
    if (this.props.query !== prevProps.query) {
      this.pageNumber = 0;
      this.setState({ gifs: [] }, () => this.searchGiphyDebounced());
    }
  };

  searchGiphy = () => {
    if (this.state.loading) return;

    const { query } = this.props;
    this.setState({ error: false, loading: true }, () => {
      this.cancelableSearchPromise = makeCancelable(
        api.gifs.search({
          q: query,
          pageSize: 18,
          pageNumber: this.state.pageNumber
        })
      );
      this.cancelableSearchPromise.promise
        .then(response =>
          this.setState({
            gifs: this.state.gifs.concat(response.data.data),
            pageNumber: this.state.pageNumber + 1,
            loading: false
          })
        )
        .catch(reason => {
          if (!reason.isCanceled)
            this.setState({ error: true, loading: false });
        });
    });
  };

  render = () => {
    if (this.state.error) return <Error />;

    return (
      <StyledContent>
        <InfiniteScroll
          style={{
            display: "flex",
            flexWrap: "wrap",
            height: "100%",
            justifyContent: "space-evenly"
          }}
          pageStart={0}
          loadMore={this.searchGiphy}
          hasMore={true}
          useWindow={false}
          initialLoad={false}
          threshold={200}
          loader={<Loader key={0} />}
        >
          <GiphyList gifs={this.state.gifs} />
        </InfiniteScroll>
      </StyledContent>
    );
  };
}

const StyledContent = styled.div`
  height: 320px;
  overflow-y: auto;
  margin-bottom: 16px;
  padding: 0px 16px;
`;
