import React, { Component } from "react";
import {
    Item,
    Grid,
    Icon,
    Image,
    Message
} from "semantic-ui-react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import netflix from "../images/netflix-logo.png";
import amazon from "../images/amazon-icon.png";
import disney from "../images/disneyplus-logo.jpg";
import itunes from "../images/itunes-logo.jpg";
import google from "../images/google-play-logo.png";
import stream from "../images/stream.png";


class ResultCard extends Component {
    state = {
        selected: false
    };

    handleClick = imdbID => {
        this.props.setSelectedShow(imdbID);
        this.setState({
        selected: true
        });
        // console.log(imdbID);
    };

    redirectToShow = () => {
        return this.state.selected && <Redirect push to="/results/show" />;
    };

    renderIcon = type => {
        if (type === "movie") {
        return <Icon name="film" size="big" floated="right" />;
        } else if (type === "series") {
        return <Icon name="tv" size="big" floated="right" />;
        } else {
        return <Icon name="question" size="big" floated="right" />;
        }
    };

    save = (imdbID, title, type, year, poster) => {
        return this.props.user && this.props.saveShow(imdbID, title, type, year, poster);
    };

    renderServices = (services) => {
        if (Array.isArray(services) && services.length > 0) {
          return services.map(service => {
            switch (service.name) {
              default:
                return null;
              case "Netflix":
                return <Image src={netflix} as="a" href={service.url}></Image>;
              case "iTunes":
                return <Image src={itunes} as="a" href={service.url}></Image>;
              case "Amazon":
                return <Image src={amazon} as="a" href={service.url}></Image>;
              case "Google Play":
                return <Image src={google} as="a" href={service.url}></Image>;
              case "DisneyPlus":
                return <Image src={disney} as="a" href={service.url}></Image>;
              case "other":
                return <Image src={stream} as="a" href={service.url}></Image>;
            }
          });
        } 
    }

    renderNoServicesMessage = () => {
        return !this.renderServices(this.props.services) && <Message>Not currently available on any streaming services</Message>
    }

    render() {
        const { imdbID, title, type, year, poster, services } = this.props;

        return (
          <Grid.Row key={imdbID}>
            <Item.Group style={{ width: "90vw" }}>
              <Item.Header onClick={() => this.handleClick(imdbID)}>
                {title}
              </Item.Header>
              <Item.Image
                src={poster}
                bordered
                centered
                onClick={() => this.handleClick(imdbID)}
              />
              <Item.Meta>{year}</Item.Meta>
              <Item.Extra>
                <Icon
                  name="heart outline"
                  size="big"
                  onClick={() => this.save(imdbID, title, type, year, poster)}
                />
                {this.renderIcon(type)}
              </Item.Extra>
              <Item.Extra>
                Watch on: <br></br>
                    <Image.Group size='tiny'>{this.renderServices(services)}</Image.Group>
                    {this.renderNoServicesMessage()}
              </Item.Extra>
            </Item.Group>
            {this.redirectToShow()}
          </Grid.Row>
        );
    }
}

const mapStateToProps = ({ user }) => {
    return {
        user
    }
}
 
const mapDispatchToProps = dispatch => {
    return {
        setSelectedShow: selected_show => dispatch ({ type: 'SET_SELECTED_SHOW', payload: { selected_show }})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultCard)