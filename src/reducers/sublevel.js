import { GET_SUBLEVEL, SAVE_APPROVAL, NEW_REQUEST, SAVE_REQUEST } from 'actions/types';

export const sublevelDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SUBLEVEL:
      console.log('reducer GET_SUBLEVEL', action.payload);
      return action.payload;
    case NEW_REQUEST:
      return {...state, data : [...state.data, action.payload]};
    case SAVE_REQUEST:
    case SAVE_APPROVAL: 
      console.log('reducer SAVE_APPROVAL', action.payload);
      const dataSet = state.data.filter(item => item.id !== action.payload.id);
      return {...state, data : [...dataSet, action.payload]};
    default:
      return state;
  }
}
