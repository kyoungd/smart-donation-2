import React from 'react';
import { mount } from 'enzyme';
import CommentBox from 'components/CommentBox';
import Root from 'Root';

describe('CommentBox test', () => {

  let wrapped;

  beforeEach(() => {
    const initialState = { auth: true };
    wrapped = mount(<Root initialState={initialState}><CommentBox /></Root >);
  })

  afterEach(() => {
    wrapped.unmount();
  })

  it('has a comment box and a button', () => {
    expect(wrapped.find('#commentbox').length).toEqual(1);
    expect(wrapped.find('button').length).toEqual(2);
  });

  describe(' the text area', () => {
    beforeEach(() => {
      wrapped
        .find('#commentbox').simulate('change', {
          target: { value: 'new comment'}
        });
      wrapped.update();
    })

    it ('has to be able to enter data in mui comment box ', () => {
      expect(wrapped.find('#commentbox').length).toEqual(1);
      expect(wrapped.find('#commentbox').prop('value')).toEqual('new comment');
    })

    it ('has to clear comment box after submit', () => {
      expect(wrapped.find('#commentbox').prop('value')).toEqual('new comment');
      wrapped.find('form')
        .first()
        .simulate('submit');
      wrapped.update();
      expect(wrapped.find('#commentbox').prop('value')).toEqual('');
    })

    it ('checks if the submit is called', () => {
      const preventDefault = jest.fn();
      expect(wrapped.find('#commentbox').prop('value')).toEqual('new comment');
      wrapped.find('form')
        .first()
        .simulate('submit', {preventDefault});
      wrapped.update();
      expect(preventDefault).toHaveBeenCalled();
    })

  })
});
