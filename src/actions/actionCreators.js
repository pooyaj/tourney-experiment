import * as ActionTypes from './actionTypes'
import {ref, playersRef} from '../firebaseLayer'

/*
 * action creators
 */

export function createTourney(name) {
  return { type: ActionTypes.CREATE_TOURNEY, name };
}

export function loadTourney(data) {
  return { type: ActionTypes.LOAD_TOURNEY, data };
}

export function addPlayer(key, name) {
  return { type: ActionTypes.ADD_PLAYER, key, name };
}

export function removePlayer(key) {
  return { type: ActionTypes.REMOVE_PLAYER, key };
}

export function submitPlayer(name) {
  return function (dispatch) {
    playersRef.push(name);
  };
}

export function submitRemovePlayer(id) {
  return function (dispatch) {
    playersRef.child(id).remove();
  };
}