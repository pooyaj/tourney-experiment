import React from 'react';
import {authWithFB} from '../../firebaseLayer'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux'

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import RaisedButton from 'material-ui/lib/raised-button';
import Divider from 'material-ui/lib/divider';
import FontIcon from 'material-ui/lib/font-icon';

import {loginWithProvider} from '../../actions/actionCreators'

import LoginForm from './LoginForm'

const login = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return <Card>
      <CardHeader
        title="Login"
        subtitle="Login to tourney manager"
      />
      <CardText>
        <LoginForm onLogin={this.props.onLoginUP}/>
        <br />    
        <RaisedButton onClick={this.props.onLoginFB}> Facebook </RaisedButton>
        <br /><br />
        <RaisedButton onClick={this.props.onLogin}> Twitter </RaisedButton>        
      </CardText>
    </Card>    
  } 
});


// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    onLoginFB: () => dispatch(loginWithProvider('facebook')), 
    onLoginUP: (loginData) => dispatch(loginWithProvider('password', loginData))
  }
}

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
  };
}

export const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(login);