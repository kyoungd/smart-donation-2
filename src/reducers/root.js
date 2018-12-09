import { DATA_OK, MESSAGE, GET_ROOT, GET_ROOT_HELPER  } from 'actions/types';

export const rootDataReducer = (state = [], action) => {
  switch (action.type) {
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
