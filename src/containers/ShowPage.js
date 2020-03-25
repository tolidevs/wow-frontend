import React, { Component, Fragment } from "react";
import { Redirect } from 'react-router-dom'
import RemoveFromWatchListModal from '../components/RemoveFromWatchListModal'
import NotLoggedInModal from '../components/NotLoggedInModal'
import {
  Segment,
  Image,
  Icon,
  Item,
  Grid,
  Message
} from "semantic-ui-react";
import { connect } from "react-redux";
import API from "../API";
import netflix from "../images/netflix-logo.png";
import amazon from "../images/amazon-icon.png";
import disney from "../images/disneyplus-logo.jpg";
import itunes from "../images/itunes-logo.jpg";
import google from "../images/google-play.png";
import stream from "../images/video-player.png";
import clapper from "../images/clapperboard.png"


class ShowPage extends Component {


// --------when page loaded get full details from API------------
  componentDidMount() {
    const { selected_show, show_details, setShowDetails } = this.props
      API.getShowDetails(selected_show).then(showObj =>
        setShowDetails({ ...show_details, ...showObj })
      );

  }

  // --------render icon for type of show/film ----------------------------
  renderType = show_type => {
    if (show_type === "movie") {
      return (
        <Fragment>
          <Icon name="film" size="big" floated="right" />
          Film
        </Fragment>
      );
    } else if (show_type === "series") {
      return (
        <Fragment>
          <Icon name="tv" size="big" floated="right" />
          Series
        </Fragment>
      );
    } else {
      return <Icon name="question" size="big" floated="right" />;
    }
  };

  renderServices = services => {
    if (services) {
      return services.map(service => {
        switch (service.name) {
          default:
            return null;
          case "Netflix":
            return <Image src={netflix} as="a" href={service.url} target="_blank"></Image>;
          case "iTunes":
            return <Image src={itunes} as="a" href={service.url} target="_blank"></Image>;
          case "Amazon Instant Video":
            return <Image src={amazon} as="a" href={service.url} target="_blank"></Image>;
          case "Google Play":
            return <Image src={google} as="a" href={service.url} target="_blank"></Image>;
          case "DisneyPlus":
            return <Image src={disney} as="a" href={service.url} target="_blank"></Image>;
          case "other":
            return <Image src={stream} as="a" href={service.url}></Image>;
        }
      });
    } 
  };




  // --------------to do with saving/unsaving a show -----------

  // save a show if a user is logged in
  save = (show) => {
    const { imdbID, title, show_type, year, poster } = show
    return this.props.user && this.saveShow(imdbID, title, show_type, year, poster);
  }

  saveShow = (imdbID, title, show_type, year, poster) => {
    const { user } = this.props
    API.saveShow(user.id, imdbID, title, show_type, year, poster)
      .then(() => this.updateSavedShows())
  }

  // get saved shows from back end & update state
  updateSavedShows = () => {
    const { user, setSavedShows } = this.props
    API.getSavedShows(user.id)
      // .then(console.log)
      .then(saved_shows => setSavedShows(saved_shows))
  }

  // delete saved show from backend and remove from saved_shows in state
  unsave = (id) => {
    this.props.setSavedShows(this.props.saved_shows.filter(saved => saved.id !== id))
    this.deleteSavedShow(id)
  }

  deleteSavedShow = (id) => {
    API.deleteSavedShow(id).then(() => this.updateSavedShows())
  }

  // if already saved then render a filled heart icon that renders a modal to check if you are sure you want to remove from watchlist
  // if not render an empty heart icon
  renderSaveIcon = (show) => {
    if (!this.props.user) {
      return <NotLoggedInModal />
    } else if (this.props.saved_shows.find(saved => saved.imdbID === show.imdbID)) {
      const savedShow = this.props.saved_shows.find(saved => saved.imdbID === show.imdbID)
      return <RemoveFromWatchListModal id={savedShow.id} title={savedShow.title} unsave={this.unsave} />
    } else {
      return (<Icon
        name="heart outline"
        size="big"
        onClick={() => this.save(show)}
      />)
    }
  }

  imgUrl = (show_details) => {
    return (show_details.poster === "N/A") ? clapper : show_details.poster
  }

// ----------- render -------------

  render() {
    const { show_details } = this.props;
    return (
      show_details ? (
      <Segment
        basic
        className="result-card"
        textAlign="center"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Grid
          textAlign="center"
          // style={{ height: "100vh" }}
          verticalAlign="middle">
          <Grid.Column>
            <Grid.Row> </Grid.Row>
            <Grid.Row> </Grid.Row>
            <Item.Group>
            <Item.Header as="h1">{show_details.title}</Item.Header>
                <Item.Image src={this.imgUrl(show_details)} centered size="medium" />
                <br></br>
            {this.renderSaveIcon(show_details)}
            <br></br>Watch on:
                {Array.isArray(show_details.services) ? (
                  <Image.Group size="tiny">
                    {this.renderServices(show_details.services)}
                  </Image.Group>
                   ) : <Message>Not currently available on any streaming services</Message>
                }
              <Grid.Row>{this.renderType(show_details.show_type)} {show_details.year}</Grid.Row>
            {show_details.genre && (
              <div>
                  <Grid.Row>
                    <Icon name="question" size="big"></Icon> {show_details.genre}
                  </Grid.Row> 
                <Grid.Row>IMDB Rating: {show_details.imdbRating} / 10</Grid.Row>
                <Grid.Row>{show_details.plot}</Grid.Row>
              </div>
            )}
            <br></br>
            <div onClick={() => this.props.history.goBack()}>
              <Icon
                name="arrow circle left"
              />
              Back
            </div>
            </Item.Group>
          </Grid.Column>
        </Grid>
      </Segment>
      ) : (
          <Redirect push to="/" />
      )
    )
  }
}

    const mapStateToProps = ({ selected_show, search_results, show_details, user, saved_shows }) => {
        return {
          selected_show,
          search_results,
          show_details,
          user,
          saved_shows
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
          setSelectedShow: selected_show => dispatch({ type: 'SET_SELECTED_SHOW', payload: { selected_show } }),
          setShowDetails: show => dispatch({ type: 'SET_SHOW_DETAILS', payload: { show } }),
          setSavedShows: saved_shows => dispatch({ type: 'SET_SAVED_SHOWS', payload: { saved_shows } })
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPage)