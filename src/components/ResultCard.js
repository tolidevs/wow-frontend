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
  };

  handleClick = imdbID => {
    this.props.setSelectedShow(imdbID);
    this.setState({
      selected: true
    });
    console.log(imdbID);
  };

  redirectToShow = () => {
    return this.state.selected && <Redirect to="/results/show" />;
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