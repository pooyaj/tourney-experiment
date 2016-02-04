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

export function addPlayer(name) {
  return { type: ActionTypes.ADD_PLAYER, name };
}

export function removePlayer(name) {
  return { type: ActionTypes.REMOVE_PLAYER, name };
}