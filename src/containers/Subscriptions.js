import React, { Component } from "react";
import { connect } from "react-redux";
import API from "../API";
import TickBox from "../components/TickBox";
import { Segment, Header } from "semantic-ui-react";

class Subscriptions extends Component {
  state = {
    services: []
  };
  // get array of available services from backend
  getServices = () => {
    API.getAllServices()
      // .then(console.log)
      .then(services => this.setState({ services }));
  };

  // render checkbox for each service
  // pass it checked=true if user_subscriptions includes service id
  mapServicesCheckboxes = services => {
    return services.map(service => this.renderCheckbox(service));
    // {
    //     return
    // })
  };

  renderCheckbox = service => {
    console.log(service);
    return (
      <div>
        <TickBox />
      </div>
    );
  };

  // saveSubscription = (service_id, user_id) => {

  // }

  render() {
    // const { user } = this.props
    return (
      <Segment>
        <Header>Your Subscriptions</Header>
        <Segment>{this.mapServicesCheckboxes(this.state.services)}</Segment>
      </Segment>
    );
  }
}

const mapStateToProps = ({ user, user_subscriptions }) => {
  return {
    user,
    user_subscriptions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserSubscriptions: user_subscriptions =>
      dispatch({
        type: "SET_USER_SUBSCRIPTIONS",
        payload: { user_subscriptions }
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions);
