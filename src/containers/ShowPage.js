import React, { Component, Fragment } from "react";
import RemoveFromWatchListModal from '../components/RemoveFromWatchListModal'
import NotLoggedInModal from '../components/NotLoggedInModal'
import {
  Segment,
  Header,
  Image,
  Icon
} from "semantic-ui-react";
import { connect } from "react-redux";
import API from "../API";
import netflix from "../images/netflix-logo.png";
import amazon from "../images/amazon-icon.png";
import disney from "../images/disneyplus-logo.jpg";
import itunes from "../images/itunes-logo.jpg";
import google from "../images/google-play-logo.png";
import stream from "../images/stream.png";


class ShowPage extends Component {
  state = {
    show: null
  };

  // ---------clear show details if nt the same as the last selected show
      // check whether there are show details stored in state yet, check whether it is teh same details as the one selected
  clearShowDetails = () => {
    const { selected_show, show_details, setShowDetails } = this.props;
    if (show_details && selected_show !== show_details.imdbID) {
      this.setState({
        show: this.getShowShortDetails()[0]
      });
      setShowDetails(this.state.show)
    }
  }

  // ----------get details from existing results object------------
  getShowShortDetails = () => {
    const { selected_show, search_results } = this.props;
    return [...search_results].filter(show => show.imdbID === selected_show);
  };


  componentDidMount() {
    const { selected_show, show_details, setShowDetails } = this.props

    // and check whether the full details have been fetched from the API.
    // if a new one is selected (not same as current saved details) then set the details to
    // the new show and do a new API fetch - makes use of API more efficient, minimise unnecessary
    // fetches when we already have the details
    
      console.log("hit_this")
    // if (show_details && selected_show !== show_details.imdbID && !("plot" in show_details)) {
      API.getShowDetails(selected_show).then(showObj =>
        setShowDetails({ ...this.state.show, ...showObj })
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
    return services.map(service => {
      switch (service.name) {
        default:
          return null;
        case "Netflix":
          return <Image src={netflix} as="a" href={service.url}></Image>;
        case "iTunes":
          return <Image src={itunes} as="a" href={service.url}></Image>;
        case "Amazon Instant Video":
          return <Image src={amazon} as="a" href={service.url}></Image>;
        case "Google Play":
          return <Image src={google} as="a" href={service.url}></Image>;
        case "DisneyPlus":
          return <Image src={disney} as="a" href={service.url}></Image>;
        case "other":
          return <Image src={stream} as="a" href={service.url}></Image>;
      }
    });
  };

  // --------------to do with saving/unsaving a show -----------

  // save a show if a user is logged in
  save = (show) => {
    const { imdbID, title, show_type, year, poster } = show
    return this.props.user && this.saveShow(imdbID, title, show_type, year, poster);
  }

  saveShow = (imdbID, title, show_type, year, poster) => {
    API.saveShow(this.props.user.id, imdbID, title, show_type, year, poster)
      .then(saved_show => this.props.setSavedShows([...this.props.saved_shows, saved_show]));
  }

  // delete saved show from backend and remove from saved_shows in state
  unsave = (id) => {
    this.props.setSavedShows(this.props.saved_shows.filter(saved => saved.id !== id))
    this.deleteSavedShow(id)
  }

  deleteSavedShow = (id) => {
    API.deleteSavedShow(id).then(json => console.log(json.message))
  }

  // if already saved then render a filled heart icon that renders a modal to check if you are sure you want to remove from watchlist
  // if not render an empty heart icon
  renderSaveIcon = (show) => {
    const savedShow = (this.props.saved_shows.filter(saved => saved.imdbID === show.imdbID))[0]

    if (!this.props.user) {
      return <NotLoggedInModal />
    } else if (savedShow) {
      return <RemoveFromWatchListModal id={savedShow.id} title={savedShow.title} unsave={this.unsave} />
    } else {
      return (<Icon
        name="heart outline"
        size="big"
        onClick={() => this.save(show)}
      />)
    }
  }

// ----------- render -------------

  render() {
    const { show_details } = this.props;

    const {
      title,
      show_type,
      year,
      poster,
      services
    } = this.getShowShortDetails()[0];
    return (
      <Segment style={{ width: "90vw" }} verticalAlign="middle">
        {this.clearShowDetails()}
        <Header>{title}</Header>
        <Image src={poster} bordered centered />
        {this.renderSaveIcon(this.props.selected_show)}
        <br></br>Watch on:
        <Image.Group size="tiny">{this.renderServices(services)}</Image.Group>
        <br></br>
        {this.renderType(show_type)} {year}
        {show_details && (
          <div>
            <p>
              <Icon name="question" size="big"></Icon> {show_details.genre}
            </p>
            <p>IMDB Rating: {show_details.imdbRating} / 10</p>
            <p>{show_details.plot}</p>
          </div>
        )}
        <br></br>
        <div onClick={() => this.props.history.goBack()}>
          <Icon
            name="arrow circle left"
          />
          Back
        </div>
      </Segment>
    );
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