import React from 'react';
import { Button } from 'react-bootstrap';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux'
import {submitPlayer, submitCreateTourney, submitLoadTourney} from '../actions/actionCreators'

const playerCreate = React.createClass({
  mixins: [PureRenderMixin],
  getData: function() {
    return this.props.data || [];
  },
  render: function() {
    return <div className="myComponent">
      <input type='text' ref='input'/>
      <Button onClick={(e) => this.props.onSubmit(this.refs.input.value.trim())}>
        Submit
      </Button>
      <Button onClick={(e) => this.props.onCreateTourney(this.refs.input.value.trim())}>
          Create Tourney
      </Button>       
      <Button onClick={(e) => this.props.onLoadTourney(this.refs.input.value.trim())}>
          Load Tourney
      </Button>              
    </div>;
  }
});


// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (data) => dispatch(submitPlayer(data)), 
    onCreateTourney: (data) => dispatch(submitCreateTourney(data)), 
    onLoadTourney: (data) => dispatch(submitLoadTourney(data))
  }
}

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    
  };
}

export const PlayerCreateContainer = connect(mapStateToProps, mapDispatchToProps)(playerCreate);