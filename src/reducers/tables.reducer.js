import {List, fromJS} from 'immutable';
import * as ActionTypes from '../actions/actionTypes'


export default function tablesReducer(state = List(), action) {
  switch (action.type) {
    case ActionTypes.CREATE_TOURNEY:
      return List();
    case ActionTypes.LOAD_TOURNEY:
      return fromJS(action.data.tables) || state;      
  }  
  return state;
}