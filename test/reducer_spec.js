import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';
import * as ActionTypes from '../src/actions/actionTypes';

describe('reducer', () => {

  it('handles CREATE_TOURNEY', () => {
    const initialState = undefined;
    const action = {
      type: ActionTypes.CREATE_TOURNEY,
      name: "This is the first tourney"
      };
    const nextState = reducer(initialState, action);
    
    expect(nextState.name).to.equal("This is the first tourney");
    expect(nextState.structure).to.equal(Map());
  });

  it('handles LOAD_TOURNEY', () => {
    const initialState = undefined;
    const data = {
        "name" : "Hello World",
        "players" : [ "Pooya Jaferian", "John Doe" ],
        "structure" : [ {
          "ante" : 0,
          "bb" : 2,
          "sb" : 1,
          "time" : 20
        }, {
          "ante" : 0,
          "bb" : 4,
          "sb" : 2,
          "time" : 20
        } ],
        "tables" : [ [ "Pooya Jaferian", "John Doe" ] ],
        "timer" : {
          "start" : "some time"
        }
      };
    const action = {
      type: ActionTypes.LOAD_TOURNEY,
      data
    };
    const nextState = reducer(initialState, action);
    
    expect(nextState.name).to.equal("Hello World");
    expect(nextState.structure).to.equal(fromJS([ {
          "ante" : 0,
          "bb" : 2,
          "sb" : 1,
          "time" : 20
        }, {
          "ante" : 0,
          "bb" : 4,
          "sb" : 2,
          "time" : 20
        }]));
    expect(nextState.tables).to.equal(fromJS([ [ "Pooya Jaferian", "John Doe" ] ]));  
    expect(nextState.players).to.equal(fromJS([ "Pooya Jaferian", "John Doe" ]));
  });

  it('handles ADD_PLAYER', () => {
    const initialState = {
        "name" : "Hello World",
        "players" : fromJS([ "Pooya Jaferian", "John Doe" ]),
        "structure" : List(),
        "tables" : List(),
        "timer" : Map()
      };
    const action = {
      type: ActionTypes.ADD_PLAYER,
      name: "James Jack"
    };
    const nextState = reducer(initialState, action);
    
    expect(nextState.name).to.equal("Hello World");
    expect(nextState.players).to.equal(fromJS([ "Pooya Jaferian", "John Doe", "James Jack" ]));
  });  

  it('handles REMOVE_PLAYER', () => {
    const initialState = {
        "name" : "Hello World",
        "players" : fromJS([ "Pooya Jaferian", "John Doe", "James Jack" ]),
        "structure" : List(),
        "tables" : List(),
        "timer" : Map()
      };
    const action = {
      type: ActionTypes.REMOVE_PLAYER,
      name: "John Doe"
    };
    const nextState = reducer(initialState, action);
    
    expect(nextState.name).to.equal("Hello World");
    expect(nextState.players).to.equal(fromJS([ "Pooya Jaferian", "James Jack" ]));
  });    

});
