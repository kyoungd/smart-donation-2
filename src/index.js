import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Root from 'Root';

import ListDonation from 'pages/root.js';
import ListApprovals from 'pages/root-sublevel.js'

import App from 'components/App';

ReactDOM.render(
  <Root>
    <BrowserRouter>
      <App>
        {/* <Route path="/post" component={MuiCommentBox} /> */}
        <Route path="/" exact component={ListDonation} />
        <Route path="/root-sublevel" component={ListApprovals} />
      </App>
    </BrowserRouter>
  </Root>
  , document.querySelector('#root')
);
