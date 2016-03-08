import * as ActionTypes from './actionTypes'
import {rootRef, updateTourneyRef, getPlayersRef, getStructureRef, authWithProvider, authWithPassword} from '../firebaseLayer'
import {CONST} from '../constants'
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
    dispatch(submitLoadTourney(newTourneyRef.key()));
  }
}

export function submitLoadTourney(id) {
  return function(dispatch, getState) {
    rootRef.child(id).once("value", snapshot => {
      dispatch(loadTourney(snapshot.val(), id));
      updateTourneyRef();    
    });    
  }
}

export function loadTourney(data, id) {
  return { type: ActionTypes.LOAD_TOURNEY, data, id };
}

export function addPlayer(key, name) {
  return { type: ActionTypes.ADD_PLAYER, key, name };
}

export function removePlayer(key) {
  return { type: ActionTypes.REMOVE_PLAYER, key };
}

export function submitPlayer(name) {
  return function (dispatch) {
    getPlayersRef().push(name);
  };
}

export function submitRemovePlayer(id) {
  return function (dispatch) {
    getPlayersRef().child(id).remove();
  };
}

export function addStructure(level, info) {
  return { type: ActionTypes.ADD_STRUCTURE, level, info};   
}

export function submitSetStructure(structure) {
  return function (dispatch) {
    getStructureRef().set(structure.toJS());
    dispatch(setStructure(structure));
  };   
}

export function setStructure(structure) {  
  return { type: ActionTypes.SET_STRUCTURE, structure};   
}


export function loginWithProvider(provider, data) {  
  return function (dispatch) {
    dispatch(loginInProgress())
    var auth = provider === 'password' 
      ? authWithPassword(data)
      : authWithProvider(provider)
    
    auth.then(function (authData) {
      // nothing to do really, firebase will update auth status
      console.log("nothing");      
    })
    .catch(function (error) {
      console.log("error");
      dispatch(loginError(error));
    });        
  };   
}

export function loginInProgress() {
  return {type: ActionTypes.AUTH_IN_PROGRESS};
}

export function loginSuccess(data) {
  return {type: ActionTypes.AUTH_LOGIN, data};
}

export function loginError(error) {
  console.log(error);
  return {type: ActionTypes.AUTH_ERROR, error};
}

export function logout() {
  return {type: ActionTypes.AUTH_LOGOUT};
}
