// reducers.js

import { combineReducers } from 'redux';

// Import your reducers here
import userReducer from './userReducer';
import eventReducer from './eventReducer';

const rootReducer = combineReducers({
  user: userReducer,
  events: eventReducer,
  // Add more reducers if needed
});

export default rootReducer;
