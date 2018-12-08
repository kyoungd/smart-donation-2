import React, { Component } from 'react'
import { Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import ListDonation from 'pages/root.js';
import * as actions from 'actions';

class App extends Component {

  renderButton() {
    if (this.props.auth) {
      return (<button id="btnSignin" onClick={() => this.props.changeAuth(false)}>Sign Out</button>);
    } else {
      return (<button id="btnSingOut" onClick={() => this.props.changeAuth(true)}>Sign In</button>);
    }
  }

  renderHeader() {
    return (
      <ul>
        <li><Link id="btnHome" to="/">Home</Link></li>
        <li><Link id="btnPost" to="/post">Post a Comment</Link></li>
        <li>{this.renderButton()}</li>
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
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, actions, null, {pure: false})(App);