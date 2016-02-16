import Firebase from 'firebase'
import {addPlayer, removePlayer} from './actions/actionCreators'


let store = undefined;   
let ref = undefined;
let playersRef = undefined;
let currentId = undefined;


export const rootRef = new Firebase("https://tourney-manager.firebaseio.com");

export function setStore(s) { 
  store = s;
};

export function getPlayersRef() {
  console.log("getting ref", ref);
  return playersRef;
};

export function updateTourneyRef() {
  
  if (currentId === store.getState().id || store.getState().id === "") {
    return;
  };
  currentId = store.getState().id;
  
  console.log("Loading with: ", currentId);
  
  ref = rootRef.child(currentId);
  
  if (playersRef) {
    playersRef.off("child_added");
    playersRef.off("child_removed");
  };
  
  playersRef = ref.child("players");
  
  playersRef.on("child_added", function (snapshot, prevChildKey) {
    store.dispatch(addPlayer(snapshot.key(), snapshot.val()));
  });

  playersRef.on("child_removed", function (snapshot) {
    store.dispatch(removePlayer(snapshot.key()));
  });    
};



