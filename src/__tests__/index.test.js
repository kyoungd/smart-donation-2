import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import moxios from 'moxios';
import Root from 'Root';
import App from 'components/App';

beforeEach(()=>{
  moxios.install();
  moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
    status: 200,
    response: [{name: 'feched #1'}, {name: 'fetched #2'}]
  });
})

afterEach(()=> {
  moxios.uninstall();
})

it('can fetch a list of comments and display them', (done) => {
  const initialState = { auth: true };
  const wrapped = mount(<Root initialState={initialState}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Root >);
  wrapped.find('#btnPost').at(0).simulate('click');
  setTimeout(() => {
    wrapped.update();
    wrapped.find('#fetchComments').simulate('click');
    setTimeout(()=> {
      wrapped.update();
      wrapped.find('#btnHome').simulate('click');
      wrapped.update();
      expect(wrapped.find('li').length).toEqual(2);
      expect(wrapped.find('li').length).not.toEqual(0);
      done();
    }, 100);
  }, 500)
})
