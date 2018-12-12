import { combineReducers } from 'redux';
import commentsReducer from 'reducers/comments';
import authReducer from 'reducers/auth';
import { rootDataReducer, rootDataHelperReducer, rootMessageReducer } from 'reducers/root';
import { sublevelDataReducer } from 'reducers/sublevel';

export default combineReducers({
  comments: commentsReducer,
  auth: authReducer,
  data: rootDataReducer,
  helper: rootDataHelperReducer,
  message: rootMessageReducer,
  dashboard: sublevelDataReducer,
});
