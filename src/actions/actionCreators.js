import * as ActionTypes from './actionTypes'

/*
 * action creators
 */

export function createTourney(name) {
  return { type: ActionTypes.CREATE_TOURNEY, name };
}

export function loadTourney(data) {
  return { type: ActionTypes.LOAD_TOURNEY, data };
}