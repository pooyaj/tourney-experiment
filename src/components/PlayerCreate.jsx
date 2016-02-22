import React from 'react';
import { Button } from 'react-bootstrap';
/*
  one note here, this only works with createClass style, but if using 
  es6 class, can use shouldComponentUpdate. Can use this for more info too: 
  https://github.com/gaearon/react-pure-render
  overall, this only needed because we are using immutable, and redux, and we 
  are sure shallow comparison would be enough to detect state changes. 
*/
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
    tourneyState: state
  };
}

export const PlayerCreateContainer = connect(mapStateToProps, mapDispatchToProps)(playerCreate);