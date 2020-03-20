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
    const { search_results, saveShow, deleteSavedShow } = this.props;
    if (Array.isArray(search_results) && search_results.length > 0) {
      return search_results.map(result => (
        <ResultCard
          // imdbID={result.imdbID}
          // title={result.title}
          // type={result.type}
          // year={result.year}
          // poster={result.poster}
          // services={result.services}
          saveShow={saveShow}
          deleteSavedShow={deleteSavedShow}
          showObj={result}
        />
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
    // console.log(search_results);
    return (
      search_string ? (
      <Segment
        textAlign="center"
        style={{
          width: "95vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Grid
          columns={1}
          // relaxed='very'
          textAlign="center"
          style={{ height: "100vh", width: "90w" }}
          verticalAlign="middle"
        >
          <Grid.Row>
            <Header>Results for {search_string}</Header>
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

const mapStateToProps = ({ search_string, search_results, user }) => {
    return {
        search_string,
        search_results,
        user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSearchResults: search_results => dispatch({ type: 'SET_SEARCH_RESULTS', payload: { search_results }}),
        setSelectedShow: selected_show =>dispatch({ type: 'SET_SELECTED_SHOW', payload: selected_show })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results)