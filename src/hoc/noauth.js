import React, { Component } from 'react'
import { connect } from 'react-redux';

export default function noauth(ChiidComponent) {
  class ComposedComponent extends Component {
    render() {
      return (
        <div>
          <ChiidComponent {...this.props} />
        </div>
      )
    }
  }
  
  return connect(mapStateToProps)(ComposedComponent);
}
  
function mapStateToProps(state) {
  return { comments: state.comments }
}
