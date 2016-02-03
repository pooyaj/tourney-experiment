import {Map, List, fromJS} from 'immutable';
import { combineReducers } from 'redux'
import * as ActionTypes from './actions/actionTypes'


function fooReducer(state = List(), action) {
  switch (action.type) {
    case ActionTypes.ADD_FOO:
      return state.push(action.data);
    case ActionTypes.SET_STATE:
      return fromJS(action.state.foo);
  }
  return state;
}

function barReducer(state = 0, action) {
  switch (action.type) {
    case ActionTypes.ADD_BAR:
      return action.data;
    case ActionTypes.SET_STATE:
      return action.state.bar;      
  }
  return state;
}

const reducer = combineReducers({
  foo: fooReducer, 
  bar: barReducer
})

export default reducer;