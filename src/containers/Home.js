import React, { Component } from 'react';
import { Segment, Form, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import API from "../API";

class Home extends Component {

  state = {
    search_submitted: false
  }

  handleChange = e => {
    this.props.setSearchString(e.target.value)
  }

  redirectToResults = () => {
    return this.state.search_submitted && this.props.search_string.length > 0 && <Redirect push to="/results" exact />
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.setSearchResults(null)
    // redirect to results page
    API.findShows(this.props.search_string.trim()).then(search_results =>
      this.props.setSearchResults(search_results)
    )

    this.setState({
      search_submitted: true
    })
    // console.log(this.props.search_string)

    
  }

  render() {
    return (
      <Segment
        className="page"
        basic
        vertical
        textAlign="center"
        style={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Grid
          centered
          textAlign="center"
          style={{ height: "100vh" }}
        >
          
          <Grid.Row verticalAlign="bottom" style={{ height: "50vh" }}>
            <Grid.Column>
              <Segment basic className="welcome">
                <Header as="h1" className="home-logo">.WoW.</Header>
                
                <p>What's on Where?<br></br>All streaming services.<br></br>One search.</p>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row verticalAlign="top" style={{ height: "50vh" }}>
            <Grid.Column>
              <Form className="form-input-custom"
              // style={{ width: "80vw"}}
              onSubmit={this.handleSubmit}
            >
                <Form.Input
                size='big'
                
                required
                action={{ icon: "search" }}
                placeholder="Type to search"
                onChange={this.handleChange}
              ></Form.Input>
              </Form>
            </Grid.Column>
          </Grid.Row>
          
          </Grid>
        {this.redirectToResults()}
      </Segment>
    );
  }
}

const mapStateToProps = ({ search_string, search_results }) => {
  return {
    search_string,
    search_results
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSearchString: search_string => dispatch({ type: 'SET_SEARCH_STRING', payload: { search_string } }),
    setSearchResults: search_results => dispatch({ type: 'SET_SEARCH_RESULTS', payload: { search_results }})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)