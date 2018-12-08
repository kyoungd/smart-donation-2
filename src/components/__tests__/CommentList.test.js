import React from 'react';
import { mount } from 'enzyme';
import Root from 'Root';
import CommentList from 'components/CommentList';

describe('CommentList', () => {
  let component;

  beforeEach(() => {
    const initialState = { comments: ['New Comment', 'Other New Comment'] };
    component = mount(<Root initialState={initialState}><CommentList /></Root >);
  })

  afterEach(() => {
    component.unmount();
  })

  it('shows an LI for each comment', () => {
    expect(component.find('li').length).toEqual(2);
  });

  it('shows each comment that is provided', () => {
    expect(component.render().text()).toContain('Other New Comment');
    expect(component.render().text()).toContain('New Comment');
  });
});
