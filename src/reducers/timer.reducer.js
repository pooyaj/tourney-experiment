import {Map, fromJS} from 'immutable';
import * as ActionTypes from '../actions/actionTypes'

/*
  elapsed: 0
  lastSave: 20 
  running: false --> elapsed = elapsed + now() - lastSave() 
*/

export default function timerReducer(state = Map({
  elapsed: 0, 
  lastSave: undefined, 
  running: false
}), action) {
  switch (action.type) {
    case ActionTypes.CREATE_TOURNEY:
      return state;
    case ActionTypes.LOAD_TOURNEY:
      return fromJS(action.data.timer) || state;
    case ActionTypes.TOGGLE_TIMER: 
      return state.set('running', action.running);
    case ActionTypes.SET_ELAPSED: 
      return state.set('elapsed', action.elapsed);
    case ActionTypes.SET_LAST_SAVE: 
      return state.set('lastSave', action.lastSaveTime);      
  }  
  return state;
}