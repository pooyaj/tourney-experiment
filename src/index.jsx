import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, browserHistory} from 'react-router';
import App from './components/App';
import {PlayerCreateContainer} from './components/PlayerCreate';
import {Tourney} from './components/Tourney';
import {LoginContainer} from './components/login/Login';

import {createStore, compose, applyMiddleware} from 'redux';
import reducer from './reducers/reducer';
import {Provider} from 'react-redux';
import * as AllActions from './actions/actionTypes'
import {loadTourney, addPlayer, removePlayer, submitLoadTourney} from './actions/actionCreators'
import DevTools from './components/DevTools';
import thunkMiddleware from 'redux-thunk';
import {updateTourneyRef, setStore, listenToAuth} from './firebaseLayer'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import {CONST} from './constants'
import { syncHistoryWithStore } from 'react-router-redux'


// for material-ui lib
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const finalCreateStore = compose(
  // Middleware you want to use in development:
  applyMiddleware(thunkMiddleware),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument()
)(createStore);

const store = finalCreateStore(reducer);
const history = syncHistoryWithStore(browserHistory, store)

setStore(store);
listenToAuth();

var allComp = () => {
  return <div> 
    <PlayerCreateContainer />
  </div>;
};

function requireAuth(nextState, replace) {
  return true;
  const auth = store.getState().auth;
  if (auth.authState !== CONST.AUTH_VALID) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

const routes = 
  <Route component={App}>
    <Route path="/" component={allComp} />
    <Route path="/tourneys" component={allComp} />
    <Route path="/tourneys/:tourneyId" component={Tourney} onEnter={requireAuth}/>
    <Route path="/anotherRoute" component={allComp} />
    <Route path="/login" component={LoginContainer} />
  </Route>;

ReactDOM.render(
  <Provider store={store}>
      <div class="container">
        <Router history={history}>{routes}</Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('app')
);


