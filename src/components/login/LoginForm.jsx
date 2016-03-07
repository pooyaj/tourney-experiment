import React from 'react';
import Divider from 'material-ui/lib/divider';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

const style = {
  marginLeft: 20,
};

const LoginForm = React.createClass({
  componentWillMount: function () {
    this.state = {username: '', password: ''};
  },  
  render: function () {
    return (    
      <form onSubmit={(e) => this._onFormSubmit(e)}>
        <TextField 
          hintText="Username"
          floatingLabelText="Username" 
          value={this.state.email}
          onChange={(event) => this.setState({email: event.target.value})}
          />
        <br />
        <TextField 
          hintText="Password" 
          floatingLabelText="Password"
          type="password"
          value={this.state.password}
          onChange={(event) => this.setState({password: event.target.value})}
          />
        <br />       
        <RaisedButton type="submit" label="Login" />
      </form>
      );
  }, 
  _onFormSubmit: function (e) {
    e.preventDefault();
    this.props.onLogin(this.state);
  }
});

export default LoginForm;
