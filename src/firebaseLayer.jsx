import Firebase from 'firebase'
import {addPlayer, removePlayer} from './actions/actionCreators'


let store = undefined;   
let ref = undefined;
let playersRef = undefined;
let structureRef = undefined;
let currentId = undefined;


export const rootRef = new Firebase("https://tourney-manager.firebaseio.com");


export function authWithProvider(provider) {
  const p = new Promise(function (resolve, reject) {
    rootRef.authWithOAuthPopup(provider, function (error, authData) {
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



