import { combineReducers } from 'redux';
import commentsReducer from 'reducers/comments';
import authReducer from 'reducers/auth';
import { rootDataReducer, rootDataHelperReducer, rootMessageReducer } from 'reducers/root';

export default combineReducers({
  comments: commentsReducer,
  auth: authReducer,
  data: rootDataReducer,
  helper: rootDataHelperReducer,
  message: rootMessageReducer,
});
