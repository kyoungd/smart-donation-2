import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from 'actions';

export default function authenticated(ChildComponent) {

  class ComposedComponent extends Component {
    
    render() {
      return (
        <div>
          { this.props.auth && <ChildComponent {...this.props} /> }
        </div>
      )
    }
  }

  return connect(mapStateToProps, actions)(ComposedComponent);
}

function mapStateToProps (state) {
  return { auth : state.auth };
}
