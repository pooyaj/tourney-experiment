import Firebase from 'firebase'

export const rootRef = new Firebase("https://tourney-manager.firebaseio.com");
export const ref = new Firebase("https://tourney-manager.firebaseio.com/test");
export const playersRef = ref.child('players');


