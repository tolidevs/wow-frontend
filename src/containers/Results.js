import React, { Component, Fragment } from "react";
import {
    Segment,
    Header,
    Dimmer,
    Loader,
    Image,
    Grid,
    Icon
} from "semantic-ui-react";
import { connect } from "react-redux";
import ResultCard from '../components/ResultCard'
import logo from '../images/logo.png'
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
        <Segment
        className="loading waiting"
            basic
            vertical
            centered
            textAlign="center"
            style={{
              width: '90vw',
              height: "40vh",
              display: "flex",
              justifyContent: 'center',
              alignItems: "center",
            }}>
            <Grid.Column centered textAlign="center">
              <Grid.Row>
                <Loader active ></Loader>
                <Image src={logo} size='small' centered></Image>
              </Grid.Row>

              <Grid.Row style={{ margin: '10px' }}>
              <Header as="h2">Finding {this.props.search_string}...</Header>
              </Grid.Row>
            </Grid.Column>
        </Segment>
    );
  };

  render() {
    const { search_string } = this.props;
    return (
      search_string ? (
        <Segment
          className='page'
          basic
          textAlign="center"
          style={{
            height: "90vh",
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center"
          }}
      >
          <Grid
            centered
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
            <Grid.Row>
              <div onClick={() => this.props.history.goBack()}>
                <Icon
                  name="arrow circle left"
                />
              Back
            </div>
            </Grid.Row>
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