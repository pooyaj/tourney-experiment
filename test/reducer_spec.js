import {OrderedMap, List, Map, fromJS} from 'immutable';
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
        "players" : {'1': "Pooya Jaferian", '2': "John Doe" },
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
    expect(nextState.players).to.equal(OrderedMap({'1': "Pooya Jaferian", '2': "John Doe" }));
  });

  it('handles ADD_PLAYER', () => {
    const initialState = {
        "name" : "Hello World",
        "players" : fromJS({'1': "Pooya Jaferian", '2': "John Doe" }),
        "structure" : List(),
        "tables" : List(),
        "timer" : Map()
      };
    const action = {
      type: ActionTypes.ADD_PLAYER,
      name: "James Jack", 
      key: '3'
    };
    const nextState = reducer(initialState, action);
    
    expect(nextState.name).to.equal("Hello World");
    expect(nextState.players).to.equal(fromJS({'1': "Pooya Jaferian", '2': "John Doe", '3': 'James Jack'}));
  });  

  it('handles REMOVE_PLAYER', () => {
    const initialState = {
        "name" : "Hello World",
        "players" : fromJS({'1': "Pooya Jaferian", '2': "John Doe", '3': 'James Jack'}),
        "structure" : List(),
        "tables" : List(),
        "timer" : Map()
      };
    const action = {
      type: ActionTypes.REMOVE_PLAYER,
      key: '2'
    };
    const nextState = reducer(initialState, action);
    
    expect(nextState.name).to.equal("Hello World");
    expect(nextState.players).to.equal(fromJS({'1': "Pooya Jaferian", '3': 'James Jack'}));
  });    
  
  it('handles ADD_STRUCTURE', () => {
    const initialState = {
        "name" : "Hello World",
        "players" : fromJS({'1': "Pooya Jaferian", '2': "John Doe", '3': 'James Jack'}),
        "structure" : OrderedMap(),
        "tables" : List(),
        "timer" : Map()
      };
      
    const action = {
      type: ActionTypes.ADD_STRUCTURE,
      level: '1',
      info: {
        sb: 5, 
        bb: 10, 
        ante: 0, 
        time: 15              
      } 
    };
    
    const nextState = reducer(initialState, action);
    
    expect(nextState.name).to.equal("Hello World");
    expect(nextState.structure).to.equal(OrderedMap(
      {'1': fromJS({
        sb: 5, 
        bb: 10, 
        ante: 0, 
        time: 15})
       }));
  });     

});
