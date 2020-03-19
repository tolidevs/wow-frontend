import React, { Component } from 'react';
import { Segment, Form } from 'semantic-ui-react';
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
    // redirect to results page
    API.findShows(this.props.search_string).then(search_results =>
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
        textAlign="center"
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            required
            action={{ icon: "search" }}
            placeholder="Search for a show or film..."
            onChange={this.handleChange}
          ></Form.Input>
        </Form>
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