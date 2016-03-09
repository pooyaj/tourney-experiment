import * as ActionTypes from '../actions/actionTypes'

export default function idReducer(state = "", action) {
  switch (action.type) {
    case ActionTypes.CREATE_TOURNEY:
      return "";
    case ActionTypes.LOAD_TOURNEY:
      return action.id || state;     
  }  
  return state;
}