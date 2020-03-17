import React, { Component } from "react";
import {
    Item,
    Grid,
    Icon
} from "semantic-ui-react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";


class ResultCard extends Component {

    state = {
        selected: false
    }

    handleClick = imdbID => {
        this.props.setSelectedShow(imdbID)
        this.setState({
            selected: true
        })
        console.log(imdbID)
    }

    redirectToShow = () => {
        return this.state.selected && <Redirect to='/results/show'/>;
    }

    renderIcon = (type) => {
        if (type === "movie") {
            return <Icon name="film" size="big" floated="right" />;
        } else if (type === "series") {
            return <Icon name="tv" size="big" floated="right" />;
        } else {
            return <Icon name="question" size="big" floated="right" />;
        }
    }

    
    render() { 
        const { imdbID, title, type, year, poster, services } = this.props;

        return (
          <Grid.Row key={imdbID}>
            <Item.Group
              style={{ width: "90vw" }}
              onClick={() => this.handleClick(imdbID)}
            >
              <Item.Header>{title}</Item.Header>
              <Item.Image src={poster} bordered centered />
              <Item.Meta>{year}</Item.Meta>
              <Item.Extra>
                <Icon name="heart outline" size="big" />
                {this.renderIcon(type)}
              </Item.Extra>
            </Item.Group>
            {this.redirectToShow()}
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