import update from 'immutability-helper';
import { GET_SUBLEVEL, SAVE_APPROVAL } from 'actions/types';

export const sublevelDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SUBLEVEL:
      console.log('reducer GET_SUBLEVEL', action.payload);
      return action.payload;
    case SAVE_APPROVAL: {
      console.log('reducer SAVE_APPROVAL', action.payload);
      var productIx = -1;
      state.data.some(( obj, idx ) => {
        if( obj.id === action.payload.id ) {
            productIx = idx;
            return true;
        }
      });
      return productIx >= 0 
        ? { data: update(state.data, { [productIx]: {$set: action.payload} } ) }
        : state;
    }
    default:
      return state;
  }
}
