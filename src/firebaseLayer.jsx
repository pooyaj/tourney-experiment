import Firebase from 'firebase'

export const ref = new Firebase("https://tourney-manager.firebaseio.com/test");
export const playersRef = ref.child('players');


