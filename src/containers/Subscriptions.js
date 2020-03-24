import React, { Component } from "react";
import { connect } from "react-redux";
import API from "../API";
import TickBox from "../components/TickBox";
import { Segment, Header } from "semantic-ui-react";

class Subscriptions extends Component {
  state = {
    services: []
  };

  componentDidMount() {
    this.getServices()
  }

  // get array of available services from backend
  getServices = () => {
    API.getAllServices()
      .then(services => this.setState({ services }));
  };

 
  mapServicesCheckboxes = services => {
    return services && services.map(service => this.renderCheckbox(service));
  };

   // render checkbox for each service
  // pass it checked=true if user_subscriptions includes service id
  renderCheckbox = service => {
    const checked = (this.props.user_subscriptions.find(subscription => subscription.service_id === service.id))
    console.log(checked)
    return (
      <TickBox
        key={service.id}
        service={service}
        checked={checked}
        toggleService={this.handleToggle}
         />
    );
  };

// ----------functions for adding and deleting a user subscription -----------

  handleToggle = (service_id, checked) => {
    if (checked) {
      this.deleteSubscription(checked.id)
    } else {
      this.saveSubscription(service_id)
    }
  }

  saveSubscription = (service_id) => {
    API.saveSubscription(service_id, this.props.user.id)
      .then(() => this.updateSubscriptionsState(this.props.user.id))
  }

  deleteSubscription = (id) => {
    API.deleteSubscription(id)
      .then(() => this.updateSubscriptionsState(this.props.user.id))
  }

  updateSubscriptionsState = (user_id) => {
    (API.getSubscriptions(user_id))
      .then(user_subscriptions => {
        this.props.setUserSubscriptions(user_subscriptions)
      })
  }

// -------------render

  render() {
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
      dispatch({ type: "SET_USER_SUBSCRIPTIONS", payload: { user_subscriptions } })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions);
