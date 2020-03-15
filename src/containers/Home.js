import React, { Component } from 'react';
import { Segment, Form } from 'semantic-ui-react';
import API from '../API';
import { connect } from 'react-redux'

class Home extends Component {

  handleChange = e => {
    this.props.setSearchString(e.target.value)
  }

  handleSubmit = e => {
    e.preventDefault()
// send search string to back end, call API search on search string and console log waht is returned
    API.findShows(this.props.search_string)
      .then( console.log )
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
            icon="search"
            placeholder="Search for a show or film..."
            onChange={this.handleChange}
          ></Form.Input>
        </Form>
      </Segment>
    );
  }
}

const mapStateToProps = ({ search_string }) => {
  return {
    search_string
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSearchString: search_string => dispatch({ type: "SET_SEARCH_STRING", payload: {search_string} })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)