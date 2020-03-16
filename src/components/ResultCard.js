import React, { Component } from "react";
import {
  Segment,
  Header,
  Image,
  Grid
} from "semantic-ui-react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import API from "../API";


class ResultCard extends Component {

    handleClick = imdbID => {
    this.props.setSelectedShow(imdbID)
    return <Redirect to={
        { pathame: `results/show/${this.props.imdbID}}`}
    } />
}
    
    render() { 
        const { setSelectedShow, imdbID, title, type, year, poster, services } = this.props;

        return (
          <Grid.Row key={imdbID}>
            <Segment
              style={{ width: "100vw" }}
              onClick={() => this.handleClick(imdbID)}
            >
              <Image src={poster} bordered centered />
              <Header>{title}</Header>
            </Segment>
          </Grid.Row>
        );
    }
}
 
const mapDispatchToProps = dispatch => {
    return {
        setSelectedShow: selected_show => dispatch ({ type: 'SET_SELECTED_SHOW', payload: { selected_show }})
    }
}

export default connect(null, mapDispatchToProps)(ResultCard)