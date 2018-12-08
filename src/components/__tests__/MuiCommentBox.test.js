import React from 'react';
import { mount } from 'enzyme';
import MuiCommentBox from 'components/MuiCommentBox';
import Root from 'Root';

describe('MuiCommentBox test', () => {

  let wrapped;

  beforeEach(() => {
    const initialState = { auth: true };
    wrapped = mount(<Root initialState={initialState}><MuiCommentBox /></Root >);
  })

  afterEach(() => {
    wrapped.unmount();
  })

  it('has a comment box and a button', () => {
    expect(wrapped.find('TextField').length).toEqual(1);
    expect(wrapped.find('Button').length).toEqual(2);
  });

  describe(' the text area', () => {
    beforeEach(() => {
      wrapped
        .find('TextField')
        .at(0)
        .props()
        .onChange({
          target: { value: 'new comment'}
        });
      wrapped.update();
    })

    it ('has to be able to enter data in mui comment box ', () => {
      expect(wrapped.find('TextField').length).toEqual(1);
      expect(wrapped.find('TextField').prop('value')).toEqual('new comment');
    })
  
    it ('has to clear comment box after submit', () => {
      expect(wrapped.find('TextField').prop('value')).toEqual('new comment');
      wrapped.find('form')
        .first()
        .simulate('submit');
      wrapped.update();
      expect(wrapped.find('TextField').length).toEqual(1);
      expect(wrapped.find('TextField').prop('value')).toEqual('');
    })
  
  })

});
