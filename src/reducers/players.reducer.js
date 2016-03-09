import {OrderedMap, fromJS} from 'immutable';
import * as ActionTypes from '../actions/actionTypes'

export default function playersReducer(state = OrderedMap(), action) {
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