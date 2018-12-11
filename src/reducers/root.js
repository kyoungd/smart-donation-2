import { 
  DATA_OK, MESSAGE, GET_ROOT, GET_ROOT_HELPER, 
  NEW_CAMPAIGN, SAVE_CAMPAIGN,
  NEW_DONATION, SAVE_DONATION
} from 'actions/types';

export const rootDataReducer = (state = [], action) => {
  switch (action.type) {
    case NEW_CAMPAIGN:
    case NEW_DONATION:
      console.log('reducer SAVE_NEW');
      return [...state, action.payload];
    case SAVE_CAMPAIGN:
    case SAVE_DONATION:
      console.log('reducer SAVE_EXISTING');
      const dataSet = state.filter(item => item.id !== action.payload.id);
      return [...dataSet, action.payload];
    case GET_ROOT:
      return action.payload;
    default:
      return state;
  }
}

export const rootDataHelperReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ROOT_HELPER:
      return action.payload;
    default:
      return state;
  }
}

export const rootDataOkReducer = (state = false, action) => {
  switch(action.type) {
    case DATA_OK:
      return action.payload;
    default: 
      return state;
  }
}

export const rootMessageReducer = (state = '', action) => {
  switch(action.type) {
    case MESSAGE:
      return action.payload;
    default: 
      return state;
  }
}
