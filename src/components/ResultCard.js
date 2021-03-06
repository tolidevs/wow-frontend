import React, { Component } from "react";
import RemoveFromWatchListModal from './RemoveFromWatchListModal'
import NotLoggedInModal from './NotLoggedInModal'
import API from '../API'
import {
    Item,
    Grid,
    Icon,
    Image,
    Message,
    Segment
} from "semantic-ui-react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import netflix from "../images/netflix-logo.png";
import amazon from "../images/amazon-icon.png";
import disney from "../images/disneyplus-logo.jpg";
import itunes from "../images/itunes-logo.jpg";
import google from "../images/google-play.png";
import stream from "../images/video-player.png";
import clapper from "../images/clapperboard.png"


class ResultCard extends Component {
  state = {
      selected: false
  };

  // -------------selecting a show & redirecting to it -----------

  handleClick = () => {
    const { showObj } = this.props
    this.props.setSelectedShow(showObj.imdbID)
    this.props.setShowDetails(showObj)
      this.setState({
      selected: true
      });
      // console.log(imdbID);
  };

  redirectToShow = () => {
    if (this.state.selected) {
      return <Redirect push to="/results/show/" />;
    }
  };


  // --------------rendering the icon depending on show_type ------------

  renderIcon = show_type => {
      if (show_type === "movie") {
      return <Icon name="film" size="big" floated="right" />;
      } else if (show_type === "series") {
      return <Icon name="tv" size="big" floated="right" />;
      } else {
      return <Icon name="question" size="big" floated="right" />;
      }
  };

// --------------to do with saving/unsaving a show -----------

  // save a show if a user is logged in
  save = (show) => {
    const { imdbID, title, show_type, year, poster } = show
    return this.props.user && this.saveShow(imdbID, title, show_type, year, poster);
  };

  saveShow = (imdbID, title, show_type, year, poster) => {
    const { user } = this.props
    API.saveShow(user.id, imdbID, title, show_type, year, poster)
      .then(() => this.updateSavedShows())
  }

  // get saved shows from back end & update state
  updateSavedShows = () => {
    const { user, setSavedShows } = this.props
    API.getSavedShows(user.id)
      .then(saved_shows => setSavedShows(saved_shows))
  }

  // delete saved show from backend and remove from saved_shows in state
  unsave = (id) => {
    this.props.setSavedShows(this.props.saved_shows.filter(saved => saved.id !== id))
    this.deleteSavedShow(id)
  }

  deleteSavedShow = (id) => {
    API.deleteSavedShow(id)
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



// ------------- to do with rendering the services -------------

    renderServices = (services) => {
        if (Array.isArray(services) && services.length > 0) {
          return services.map(service => {
            switch (service.name) {
              default:
                return null;
              case "Netflix":
                return <Image src={netflix} as="a" href={service.url} target="_blank" ></Image>;
              case "iTunes":
                return <Image src={itunes} as="a" href={service.url} target="_blank" ></Image>;
              case "Amazon":
                return <Image src={amazon} as="a" href={service.url} target="_blank" ></Image>;
              case "Google Play":
                return <Image src={google} as="a" href={service.url} target="_blank" ></Image>;
              case "DisneyPlus":
                return <Image src={disney} as="a" href={service.url} target="_blank" ></Image>;
              case "other":
                return <Image src={stream} as="a" href={service.url} target="_blank" ></Image>;
            }
          });
        } 
    }

    renderNoServicesMessage = () => {
        return !this.renderServices(this.props.showObj.services) && <Message>Not currently available on any streaming services</Message>
    }
  
  // ---------------render ---------------

    render() {
      const { imdbID, title, show_type, year, services } = this.props.showObj
      const img_url = (this.props.showObj.poster === "N/A") ?  clapper  : this.props.showObj.poster
        const { showObj } = this.props
        return (
          <Grid.Row key={imdbID}>
            <Segment
              basic
              className="result-card"
              textAlign="center"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
            <Item.Group style={{ width: "90vw" }}>
              <Item.Header as="h2" onClick={() => this.handleClick()}>
                {title}
              </Item.Header>
                <Item.Image
                  size="medium"
                src={img_url}
                centered
                onClick={() => this.handleClick()}
              />
              <Item.Meta>{year}</Item.Meta>
                <Item.Extra>
                    {this.renderSaveIcon(showObj)}
                    {this.renderIcon(show_type)}
              </Item.Extra>
              <Item.Extra>
                Watch on: <br></br>
                    <Image.Group size='tiny'>{this.renderServices(services)}</Image.Group>
                    {this.renderNoServicesMessage()}
              </Item.Extra>
              </Item.Group>
            </Segment>
            {this.redirectToShow()}
          </Grid.Row>
          
        );
    }
}

const mapStateToProps = ({ user, saved_shows }) => {
    return {
        user,
        saved_shows
    }
}
 
const mapDispatchToProps = dispatch => {
    return {
      setSelectedShow: selected_show => dispatch({ type: 'SET_SELECTED_SHOW', payload: { selected_show } }),
      setSavedShows: saved_shows => dispatch({ type: 'SET_SAVED_SHOWS', payload: { saved_shows } }),
      setShowDetails: show => dispatch({ type: 'SET_SHOW_DETAILS', payload: { show } })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultCard)