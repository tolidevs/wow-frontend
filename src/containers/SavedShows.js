import React, { Component, Fragment } from "react";
import {
  Segment,
  Header,
  Grid,
  Image,
  Loader
} from "semantic-ui-react";
import { connect } from "react-redux";
import ResultCard from "../components/ResultCard";
import API from "../API";
import FilterDropDown from './FilterDropDown'
import logo from '../images/logo.png'

class SavedShows extends Component {

  state = {
    filter: null,
    servicesLoaded: false
  }


  renderResults = () => {
    const { saved_shows } = this.props;
    if (!saved_shows || saved_shows.length === 0) {
      return (
        <Grid.Row>
          <Header as="h2" className="no-saved">You have not saved any shows yet</Header>
        </Grid.Row>
      )
    } else if (!this.state.servicesLoaded || !this.state.filter ) {
      return [...saved_shows].map(result => (
        <ResultCard showObj={result} />
      ))
    } else {
      return this.filteredResults().map(result => (
        <ResultCard showObj={result} />
      ))
    }
  };


  // create array of service ids to filter by from those in user_subscriptions
  filterArray = () => {
    const { user_subscriptions } = this.props
    let filter_ids = []
    if (this.state.filter === "subscriptions") {
      user_subscriptions.map(subscription => filter_ids.push(subscription.service_id))
      return filter_ids
    } else {
      filter_ids.push(this.state.filter)
      return filter_ids
    }
  }

  // return filtered results if filtered array is valid or return saved_shows
  filteredResults = () => {
    const filter_array = this.filterArray()
    const { saved_shows } = this.props
    if (!filter_array[0]) {
      return saved_shows
    } else {
      const filtered_shows = []
      for (const filter_id of filter_array) {
        const filter_name = this.mapNameToID(filter_id)
        const show = saved_shows.filter(saved => saved.services && Object.values(saved.services).find(service => service.name === filter_name))
        filtered_shows.push(show)
      }
      return ([...new Set(filtered_shows.flat())])
    }
  }
  
// mapping service ids to names as don't have service IDs in results objects from backend - need to refactor
  mapNameToID = (id) => {
    switch (id) {
      case 1:
        return "Netflix"
      case 2:
        return "Amazon Instant Video"
      case 3:
        return "iTunes"
      case 4:
        return "DisneyPlus"
      case 5:
        return "Google Play"
    }
  }


  // render loading page or results
  renderCards = () => {
    return (
    this.props.saved_shows ? (
        <Fragment>
      <Grid.Row><FilterDropDown setFilter={this.setFilter} /></Grid.Row>
      { this.renderResults() }
      </Fragment >
    ) : (
      <Segment
        className="loading waiting"
        basic
        vertical
        centered
        textAlign="center"
        style={{
          width: '90vw',
          height: "40vh",
          display: "flex",
          justifyContent: 'center',
          alignItems: "center",
        }}>
        <Grid.Column centered textAlign="center">
        <Grid.Row>
            <Loader active ></Loader>
            <Image src={logo} size='small' centered></Image>
          </Grid.Row>
          
        <Grid.Row style={{margin: '10px'}}>
          <Header as="h2">Loading saved shows...</Header>
          </Grid.Row>
        </Grid.Column>
      </Segment >
        )
    )
  };

  // when page  loads do fetch for services if saved_shows has a value
  componentDidMount() {
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
      .then(() => this.setState({servicesLoaded:true}) )
  }

// iterate through saved shows in state and replace if they are in shows returned from API (updated with services) then update redux saved_services state with new array
  mapServicesToState = (results_array) => {
    if (results_array.length > 0){
    const replace_shows = [...this.props.saved_shows].map(show => results_array.filter(s => s.imdbID === show.imdbID)[0] || show)
      this.props.setSavedShows(replace_shows)
    }
  }

  setFilter = (value) => {
    this.setState({
      filter: value
    })
  }

  render() {
    return (
      <Segment
        className='page'
        basic
        vertical
        textAlign="center"
      >
        <Grid
          centered
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column>
            <Grid.Row> </Grid.Row>
            <Grid.Row> </Grid.Row>
            <Grid.Row>
              <Segment
                basic
                textAlign="center"
              >
                  <Header as="h1">Your Watch List</Header>
                </Segment>
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

const mapStateToProps = ({ saved_shows, user, user_subscriptions }) => {
  return {
    saved_shows,
    user,
    user_subscriptions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSelectedShow: selected_show => dispatch({ type: "SET_SELECTED_SHOW", payload: { selected_show } }),
    setSavedShows: saved_shows => dispatch({ type: 'SET_SAVED_SHOWS', payload: { saved_shows } })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedShows);
