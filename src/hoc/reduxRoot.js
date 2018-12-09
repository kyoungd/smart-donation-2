import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from 'actions';

export default function ReduxRoot(ChiidComponent) {
  class ComposedComponent extends Component {
    render() {
      return (
        <div>
          <ChiidComponent {...this.props} />
        </div>
      )
    }
  }
  
  return connect(mapStateToProps, actions)(ComposedComponent);
}
  
function mapStateToProps(state) {
  return { data: state.data, showLoading: state.showLoading }
}
