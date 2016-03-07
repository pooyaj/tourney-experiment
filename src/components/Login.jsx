import React from 'react';
import {authWithFB} from '../firebaseLayer'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux'

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import RaisedButton from 'material-ui/lib/raised-button';

import {loginUsingFacebook} from '../actions/actionCreators'

const login = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return <Card>
      <CardHeader
        title="Login"
        subtitle="Login to the system"
      />
      <CardText>                  
        <RaisedButton onClick={this.props.onLogin}> Login </RaisedButton>
      </CardText>
    </Card>;
  } 
});


// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    onLogin: () => dispatch(loginUsingFacebook())
  }
}

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
  };
}

export const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(login);