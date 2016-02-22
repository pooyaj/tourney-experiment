import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux'
import {submitLoadTourney} from '../actions/actionCreators'
import {PlayersListContainer} from './PlayersList';


const tourney = React.createClass({
  mixins: [PureRenderMixin],
  
  componentDidMount: function () {
    if (this.props.params.tourneyId) {
      this.props.loadTourney(this.props.params.tourneyId);
    }
  },
  
  render: function() {
    const view = this.props.tourneyState ? <PlayersListContainer /> : <div>Loading</div> 
    return <div className="tourneyContainer">
      {this.props.params.tourneyId}      
      <hr />
      {view}
    </div>;
  }
});


// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    loadTourney: tourneyId => dispatch(submitLoadTourney(tourneyId))
  }
}

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    tourneyState: state    
  };
}

export const Tourney = connect(mapStateToProps, mapDispatchToProps)(tourney);