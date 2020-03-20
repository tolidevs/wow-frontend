import React, { Component, Fragment } from "react";
import {
  Segment,
  Header,
  Grid
} from "semantic-ui-react";
import { connect } from "react-redux";
import ResultCard from "../components/ResultCard";

class SavedShows extends Component {
  renderResults = () => {
    const { saved_shows, saveShow, deleteSavedShow } = this.props;
    if (saved_shows.length > 0) {
      return saved_shows.map(result => (
        <ResultCard
          // imdbID={result.imdbID}
          // title={result.title}
          // type={result.type}
          // year={result.year}
          // poster={result.poster}
          // services={result.services}
          saveShow={saveShow}
          deleteSavedShow={deleteSavedShow}
          showObj={result}

        />
      ));
    } else {
        return <Header>You have not saved any shows yet</Header>
    }
  };

  renderCards = () => {
    return <Fragment>{this.renderResults()}</Fragment>
  };

  render() {
    return (
      <Segment
        textAlign="center"
        style={{
          width: "95vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Grid
          columns={1}
          // relaxed='very'
          textAlign="center"
          style={{ height: "100vh", width: "90w" }}
          verticalAlign="middle"
        >
          <Grid.Row>
            <Header>Your Watch List</Header>
          </Grid.Row>
          {this.renderCards()}
        </Grid>
      </Segment>
    );
  }
}

const mapStateToProps = ({ saved_shows, user }) => {
  return {
    saved_shows,
    user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSelectedShow: selected_show =>
      dispatch({ type: "SET_SELECTED_SHOW", payload: selected_show })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedShows);
