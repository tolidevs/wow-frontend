import React, { Component, Fragment } from "react";
import {
  Segment,
  Header,
  Image,
  Icon
} from "semantic-ui-react";
import { connect } from "react-redux";
import API from "../API";


class ShowPage extends Component {
    state = {
        show: null
    }
    
    getShowShortDetails = () => {
        const { selected_show, search_results } = this.props;
        return [...search_results].filter(show => show.imdbID === selected_show)
    };
        
    componentDidMount() {
        this.setState({
          show: this.getShowShortDetails()[0]
        });
        API.getShowDetails(this.props.selected_show)
            .then( showObj => this.props.setShowDetails({...this.state.show, ...showObj}))
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
        const { show_details } = this.props;
        const {
        title,
        type,
        year,
        poster,
        services
        } = this.getShowShortDetails()[0]
        return (
          <Segment style={{ width: "90vw" }} verticalAlign="middle">
            <Header>{title}</Header>
            <Image src={poster} bordered centered />
            <Icon name="heart outline" size="big" floated="right" />
            <br></br>Watch on:
            <br></br>
            {this.renderType(type)} {year}
            {show_details && (
              <div>
                <p>
                  <Icon type="question" size="big"></Icon> {show_details.genre}
                </p>
                <p>IMDB Rating: {show_details.imdbRating} / 10</p>
                <p>{show_details.plot}</p>
              </div>
            )}
          </Segment>
        );
    }
}

    const mapStateToProps = ({ selected_show, search_results, show_details }) => {
        return {
            selected_show,
            search_results,
            show_details
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            setSelectedShow: selected_show => dispatch({ type: 'SET_SELECTED_SHOW', payload: { selected_show } }),
            setShowDetails: show => dispatch({ type: 'SET_SHOW_DETAILS', payload: { show }})
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPage)