import React, { Component, Fragment } from "react";
import {
    Segment,
    Header,
    Dimmer,
    Loader,
    Image,
    Grid
} from "semantic-ui-react";
import { connect } from "react-redux";
import ResultCard from '../components/ResultCard'
import clapper from '../images/clapper-img.png'
import { Redirect } from "react-router-dom";


class Results extends Component {
  
  renderResults = () => {
    const { search_results } = this.props;
    if (Array.isArray(search_results) && search_results.length > 0) {
      return search_results.map(result => (
        <ResultCard showObj={result} />
      ));
    }
  };

  renderCards = () => {
    return this.props.search_results ? (
      <Fragment>{this.renderResults()}</Fragment>
    ) : (
      <Grid.Row>
        <Segment>
          <Dimmer active inverted>
            <Loader inverted></Loader>
          </Dimmer>
          <Image src={clapper} size="medium" centered />
          <Header>Searching...</Header>
        </Segment>
      </Grid.Row>
    );
  };

  render() {
    const { search_string } = this.props;
    return (
      search_string ? (
        <Segment
          basic
          textAlign="center"
          style={{
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
      >
        <Grid
            textAlign="center"
            style={{ height: "100vh" }}
            verticalAlign="middle"
          >
            <Grid.Row> </Grid.Row>
            <Grid.Row> </Grid.Row>
          <Grid.Row>
            <Header as="h1">Results for {search_string}</Header>
          </Grid.Row>
          {this.renderCards()}
        </Grid>
        </Segment>
      ) : (
          <Redirect push to="/" />
      )
    ) 
  }
}

const mapStateToProps = ({ search_string, search_results }) => {
    return {
        search_string,
        search_results,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      setSearchResults: search_results => dispatch({ type: 'SET_SEARCH_RESULTS', payload: { search_results }})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results)