import React from 'react';
import Player from './Player';
/*
  one note here, this only works with createClass style, but if using 
  es6 class, can use shouldComponentUpdate. Can use this for more info too: 
  https://github.com/gaearon/react-pure-render
  overall, this only needed because we are using immutable, and redux, and we 
  are sure shallow comparison would be enough to detect state changes. 
*/
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux'
import {submitRemovePlayer} from '../actions/actionCreators'

const playersList = React.createClass({
  mixins: [PureRenderMixin],
  getData: function() {
    return this.props.data || [];
  },
  render: function() {
    var data = this.getData();
    return <div>      
      {data.map(
        (item, key) => <Player onRemovePlayer={e=>this.props.onClick(key)} name={item} />)}
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