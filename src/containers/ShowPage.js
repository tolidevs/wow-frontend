import React, { Component, Fragment } from "react";
import {
  Segment,
  Header,
  Image,
  Grid
} from "semantic-ui-react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import API from "../API";


class ShowPage extends Component {
  getShowShortDetails = () => {
    const { selected_show, search_results } = this.props;
    return [...search_results].filter(show => show.imdbID === selected_show);
  };
    
componentDidMount() => {
    API.get
  }
    
    

  renderType = type => {
    if (type === "movie") {
        return (
          <Fragment>
                <Icon name="film" size="big" floated="right" />
                Film
          </Fragment>
        );
                
    } else if (type === "series") {
        return (
            <Fragment>
                <Icon name="tv" size="big" floated="right" />
                Series
            </Fragment> 
        )
    } else {
      return <Icon name="question" size="big" floated="right" />
    }
  };

  render() {
    const { selected_show, renderIcon } = this.props;
    const {
      imdbID,
      title,
      type,
      year,
      poster,
      services
    } = this.getShowShortDetails()[0];
    return (
      <Segment style={{ width: "90vw" }} verticalAlign="middle">
        <Header>{title}</Header>
        <Image src={poster} bordered centered />
        <Icon name="heart outline" size="big" />
        <br></br>Watch on:
        {this.renderIcon(type)}
      </Segment>
    );
  }
}

const mapStateToProps = ({ selected_show, search_results }) => {
    return {
        selected_show,
        search_results
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSelectedShow: selected_show => dispatch ({ type: 'SET_SELECTED_SHOW', payload: { selected_show }})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPage)