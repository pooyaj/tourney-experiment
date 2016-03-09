import {routerReducer} from 'react-router-redux'
import { combineReducers } from 'redux'

// importing all reducers
import structureReducer from './structure.reducer'
import nameReducer from './name.reducer'
import tablesReducer from './tables.reducer'
import playersReducer from './players.reducer'
import timerReducer from './timer.reducer'
import idReducer from './id.reducer'
import authReducer from './auth.reducer'


const reducer = combineReducers({
  structure: structureReducer, 
  name: nameReducer, 
  tables: tablesReducer, 
  players: playersReducer, 
  timer: timerReducer, 
  id: idReducer, 
  auth: authReducer, 
  routing: routerReducer
})

export default reducer;