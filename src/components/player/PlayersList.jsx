import React from 'react';
import Player from './Player';
import {PlayerInputContainer} from './PlayerInput';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux'
import {submitRemovePlayer} from '../../actions/actionCreators'

const playersList = React.createClass({
  mixins: [PureRenderMixin],
  getData: function() {
    return this.props.data || [];
  },
  render: function() {
    var data = this.getData();
    return <div>
      <PlayerInputContainer />      
      {data.map(
        (item, key) => <Player onRemovePlayer={e=>this.props.onClick(key)} name={item} key={key}/>)}
    </div>;
  }
});



// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    onClick: (key) => dispatch(submitRemovePlayer(key))
  }
}

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    data: state.players    
  };
}

export const PlayersListContainer = connect(mapStateToProps, mapDispatchToProps)(playersList);