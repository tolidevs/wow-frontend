import React, { Component, Fragment } from "react";
import {
  Segment,
  Header,
  Grid,
  Dimmer,
  Loader
} from "semantic-ui-react";
import { connect } from "react-redux";
import ResultCard from "../components/ResultCard";
import API from "../API";

class SavedShows extends Component {

  renderResults = () => {
    const { saved_shows } = this.props;
    if (saved_shows.length > 0) {
      return [...saved_shows].map(result => (
        <ResultCard showObj={result} />
      ));
    } else {
      return (
        <Grid.Row>
          <Header as="h2">You have not saved any shows yet</Header>
        </Grid.Row>
      )
    }
  };

  renderCards = () => {
    return this.props.saved_shows ? (
      <Fragment>{this.renderResults()}</Fragment>
    ) : (
        <Grid.Row>
          <Segment>
            <Dimmer active inverted>
              <Loader inverted></Loader>
            </Dimmer>
            <Header>Loading saved shows...</Header>
          </Segment>
        </Grid.Row>
      );
  };

  // when page  loads do fetch for services if saved_shows has a value
  componentDidMount() {
    console.log("updated")
    setTimeout(() => {
      const shows = this.props.saved_shows
      shows && this.getServices(shows)
    }, 1500)
    
  }

  // check if show has services key. if not add to array (as do not yet have data on where is available). 
  // run fetch services on array and assign services to each show(done in back end)
  getServices = (shows) => {
    const get_services_array = shows.filter(saved_show => !saved_show.services)
    API.getServices(get_services_array)
      .then(results => this.mapServicesToState(results))
  }

// iterate through saved shows in state and replace if they are in shows returned from API (updated with services) then update redux saved_services state with new array
  mapServicesToState = (results_array) => {
    if (results_array.length > 0){
    const replace_shows = [...this.props.saved_shows].map(show => results_array.filter(s => s.imdbID === show.imdbID)[0] || show)
      this.props.setSavedShows(replace_shows)
    }
  }


  render() {
    return (
      <Segment
        basic
        textAlign="center"
        style={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column>
            <Grid.Row> </Grid.Row>
            <Grid.Row> </Grid.Row>
            <Grid.Row>
              <Header as="h1">Your Watch List</Header>
            </Grid.Row>
            <Fragment>
              {this.renderCards()}
            </Fragment>
          </Grid.Column>
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
    setSelectedShow: selected_show => dispatch({ type: "SET_SELECTED_SHOW", payload: { selected_show } }),
    setSavedShows: saved_shows => dispatch({ type: 'SET_SAVED_SHOWS', payload: { saved_shows } })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedShows);
