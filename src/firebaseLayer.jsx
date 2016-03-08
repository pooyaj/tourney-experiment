import Firebase from 'firebase'
import {addPlayer, removePlayer, loginSuccess, logout} from './actions/actionCreators'
import {CONST} from './constants'
import {partial} from 'lodash'

let store = undefined;   
let ref = undefined;
let playersRef = undefined;
let structureRef = undefined;
let currentId = undefined;


export const rootRef = new Firebase("https://tourney-manager.firebaseio.com");

export function listenToAuth() {
  rootRef.onAuth(function(authData){
    if (authData){ 
      
      let username = '';
      switch(authData.provider) {
        case 'facebook': 
          username = authData.facebook.displayName;
          break; 
        case 'password':
          username = authData.password.email;
          break;
      }
      
      console.log("valid auth");
      store.dispatch(loginSuccess({
          uid: authData.uid, 
          provider: authData.provider, 
          username: username, 
          authState: CONST.AUTH_VALID
        }));
    } else {
      if (store.getState().auth.authState !== CONST.AUTH_ANONYMOUS){ // log out if not already logged out
        store.dispatch(logout());
      }
    }
  });  
}

export function authWithProvider(provider) {
  const p = new Promise(function (resolve, reject) {
    rootRef.authWithOAuthPopup(provider, function (error, authData) {
      console.log("Done everything");      
      if (error) {        
        reject(error);
      } else {        
        resolve(authData);
      }
    });
  });
  return p;
}

export function authWithPassword(data) {
  const p = new Promise(function (resolve, reject) {
    rootRef.authWithPassword(data, function (error, authData) {
      console.log("Done everything");      
      if (error) {        
        reject(error);
      } else {        
        resolve(authData);
      }
    });
  });
  return p;
}

export function setStore(s) { 
  store = s;
};

export function getPlayersRef() { 
  return playersRef;
};

export function getStructureRef() {
  return structureRef;
};

export function updateTourneyRef() {
  
  if (currentId === store.getState().id || store.getState().id === "") {
    return;
  };
  currentId = store.getState().id;
  
  
  ref = rootRef.child(currentId);
  
  if (playersRef) {
    playersRef.off("child_added");
    playersRef.off("child_removed");
  };
  
  playersRef = ref.child("players");
  structureRef = ref.child("structure");
  
  playersRef.on("child_added", function (snapshot, prevChildKey) {
    store.dispatch(addPlayer(snapshot.key(), snapshot.val()));
  });

  playersRef.on("child_removed", function (snapshot) {
    store.dispatch(removePlayer(snapshot.key()));
  });    
};




