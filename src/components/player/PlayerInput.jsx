import React from 'react';
import {connect} from 'react-redux'
import {submitPlayer} from '../../actions/actionCreators'
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

const playerInput = React.createClass({  
  componentWillMount: function () {
    this.state = {playerName: ''};
  },
  render: function() {
    return (<form onSubmit={(e) => this._onFormSubmit(e)} className="form-group row">
      <div className="col-xs-8 col-md-8"> 
        <TextField
          fullWidth={true} 
          type='text'
          placeholder='Enter player name'
          value={this.state.playerName}
          onChange={(event) => this.setState({playerName: event.target.value})}
         /> 
      </div>
      <div className="col-xs-4 col-md-4"> 
        <RaisedButton type="submit"> Submit </RaisedButton> 
      </div>        
    </form>);
  }, 
  _onFormSubmit: function (event) {
    event.preventDefault();
    this.props.onSubmit(this.state.playerName);
    this.setState({playerName: ''});
  }
});

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (data) => dispatch(submitPlayer(data)), 
  }
}

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
        
  };
}

export const PlayerInputContainer = connect(mapStateToProps, mapDispatchToProps)(playerInput);