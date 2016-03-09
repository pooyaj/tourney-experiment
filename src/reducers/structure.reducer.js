import * as ActionTypes from '../actions/actionTypes'
import {Map, fromJS} from 'immutable';


export default function structureReducer(state = Map(), action) {
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