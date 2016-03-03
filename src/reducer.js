import {OrderedMap, Map, List, fromJS} from 'immutable';
import { combineReducers } from 'redux'
import * as ActionTypes from './actions/actionTypes'


function structureReducer(state = Map(), action) {
  switch (action.type) {
    case ActionTypes.CREATE_TOURNEY:
      return Map();
    case ActionTypes.LOAD_TOURNEY:
      return fromJS(action.data.structure) || state;
    case ActionTypes.ADD_STRUCTURE:
      return state.set(action.level, fromJS(action.info));
    case ActionTypes.SET_STRUCTURE:
      return action.structure;
  }
  return state;
}

function nameReducer(state = "My Tourney", action) {
  switch (action.type) {
    case ActionTypes.CREATE_TOURNEY:
      return action.name;
    case ActionTypes.LOAD_TOURNEY:
      return action.data.name || state;
  }
  return state;
}

function tablesReducer(state = List(), action) {
  switch (action.type) {
    case ActionTypes.CREATE_TOURNEY:
      return List();
    case ActionTypes.LOAD_TOURNEY:
      return fromJS(action.data.tables) || state;      
  }  
  return state;
}

function playersReducer(state = OrderedMap(), action) {
  switch (action.type) {
    case ActionTypes.CREATE_TOURNEY:
      return OrderedMap();
    case ActionTypes.LOAD_TOURNEY:
      return OrderedMap(action.data.players) || state;
    case ActionTypes.ADD_PLAYER:
      return state.set(action.key, action.name);
    case ActionTypes.REMOVE_PLAYER:
      return state.delete(action.key);
  }  
  return state;
}

function timerReducer(state = Map(), action) {
  switch (action.type) {
    case ActionTypes.CREATE_TOURNEY:
      return Map();
    case ActionTypes.LOAD_TOURNEY:
      return fromJS(action.data.timer) || state;
  }  
  return state;
}

function idReducer(state = "", action) {
  switch (action.type) {
    case ActionTypes.CREATE_TOURNEY:
      return "";
    case ActionTypes.LOAD_TOURNEY:
      return action.id || state;     
  }  
  return state;
}

const reducer = combineReducers({
  structure: structureReducer, 
  name: nameReducer, 
  tables: tablesReducer, 
  players: playersReducer, 
  timer: timerReducer, 
  id: idReducer
})

export default reducer;