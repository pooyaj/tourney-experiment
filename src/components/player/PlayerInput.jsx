import React from 'react';
import { Button } from 'react-bootstrap';
import {connect} from 'react-redux'
import {submitPlayer} from '../../actions/actionCreators'

const playerInput = React.createClass({
  render: function() {
    return <div className="form-group row">
      <div className="col-xs-8 col-md-8"> <input type='text' ref='input'/> </div>
      <div className="col-xs-4 col-md-4"> <Button onClick={(e) => this.props.onSubmit(this.refs.input.value.trim())}>Submit</Button> </div>        
    </div>;
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