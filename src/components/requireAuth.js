import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from 'actions';

export default function requireAuth(ChildComponent) {
  class ComposedComponent extends Component {

    componentDidMount() {
      this.shouldNavigateAway();
    }
  
    componentDidUpdate() {
      this.shouldNavigateAway();
    }
  
    shouldNavigateAway() {
      if (!this.props.auth)
        this.props.history.push('/');
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  return connect(mapStateToProps, actions)(ComposedComponent);
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

