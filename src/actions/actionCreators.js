import * as ActionTypes from './actionTypes'

/*
 * action creators
 */
export function addFoo(data) {
  return { type: ActionTypes.ADD_FOO, data };
}

export function addBar(data) {
  return { type: ActionTypes.ADD_BAR, data };
}

export function setState(state) {
  return { type: ActionTypes.SET_STATE, state };
}