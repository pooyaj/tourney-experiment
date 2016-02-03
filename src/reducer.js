import {Map, List, fromJS} from 'immutable';
import { combineReducers } from 'redux'
import * as ActionTypes from './actions/actionTypes'


function structureReducer(state = Map(), action) {
  switch (action.type) {
    case ActionTypes.CREATE_TOURNEY:
      return Map();
    case ActionTypes.LOAD_TOURNEY:
      return fromJS(action.data.structure);
  }
  return state;
}

function nameReducer(state = "My Tourney", action) {
  switch (action.type) {
    case ActionTypes.CREATE_TOURNEY:
      return action.name;
    case ActionTypes.LOAD_TOURNEY:
      return action.data.name;
  }
  return state;
}

function tablesReducer(state = List(), action) {
  switch (action.type) {
    case ActionTypes.CREATE_TOURNEY:
      return List();
    case ActionTypes.LOAD_TOURNEY:
      return fromJS(action.data.tables);      
  }  
  return state;
}

function playersReducer(state = List(), action) {
  switch (action.type) {
    case ActionTypes.CREATE_TOURNEY:
      return List();
    case ActionTypes.LOAD_TOURNEY:
      return fromJS(action.data.players);      
  }  
  return state;
}

function timerReducer(state = Map(), action) {
  switch (action.type) {
    case ActionTypes.CREATE_TOURNEY:
      return Map();
    case ActionTypes.LOAD_TOURNEY:
      return fromJS(action.data.timer);
  }  
  return state;
}

const reducer = combineReducers({
  structure: structureReducer, 
  name: nameReducer, 
  tables: tablesReducer, 
  players: playersReducer, 
  timer: timerReducer
})

export default reducer;