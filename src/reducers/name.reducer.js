import * as ActionTypes from '../actions/actionTypes'

export default function nameReducer(state = "My Tourney", action) {
  switch (action.type) {
    case ActionTypes.CREATE_TOURNEY:
      return action.name;
    case ActionTypes.LOAD_TOURNEY:
      return action.data.name || state;
  }
  return state;
}