import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import communityReducer from './community-reducer';
import thunk from 'redux-thunk';


const rootReducer = combineReducers({communityReducer});

const store = () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};

export default store();