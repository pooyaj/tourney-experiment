import * as ActionTypes from './actionTypes'
import {rootRef, ref, playersRef} from '../firebaseLayer'

/*
 * action creators
 */

export function createTourney(name) {
  return { type: ActionTypes.CREATE_TOURNEY, name };
}

export function submitCreateTourney(name) {
  return function(dispatch, getState) {
    dispatch(createTourney(name));
    const currentState = getState();
    let jsState = {};
    Object.keys(currentState).forEach(function (key) {
      jsState[key] = typeof currentState[key] === 'object' ? currentState[key].toJS() : currentState[key];
    });
    const newTourneyRef = rootRef.push(jsState);    
  }
}

export function submitLoadTourney(id) {
  return function(dispatch, getState) {
    rootRef.child(id).once("value", snapshot => dispatch(loadTourney(snapshot.val())));
  }
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