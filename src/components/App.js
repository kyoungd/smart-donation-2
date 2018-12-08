import React, { Component } from 'react'
import { Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import ListDonation from 'pages/root.js';
import ListApprovals from 'pages/root-sublevel.js'
import * as actions from 'actions';

class App extends Component {

  renderHeader() {
    return (
      <ul>
        <li><Link id="btnHome" to="/">Home</Link></li>
      </ul>
    )
  }

  render() {
    return (
      <div>
        <div>{ this.renderHeader() }</div>
        <Switch>
          {/* <Route path="/post" component={MuiCommentBox} /> */}
          <Route path="/" exact component={ListDonation} />
          <Route path="/root-sublevel" component={ListApprovals} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, actions, null, {pure: false})(App);