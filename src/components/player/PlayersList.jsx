import React from 'react';
import Player from './Player';
import {PlayerInputContainer} from './PlayerInput';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux'
import {submitRemovePlayer} from '../../actions/actionCreators'

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';

const playersList = React.createClass({
  mixins: [PureRenderMixin],
  getData: function() {
    return this.props.data || [];
  },
  render: function() {
    var data = this.getData();
    return <Card>
      <CardHeader
        title="Players"
        subtitle="Add or remove Players"
      />
      <CardText>                  
        <PlayerInputContainer />      
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Player Name</TableHeaderColumn>
              <TableHeaderColumn>Remove</TableHeaderColumn>            
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(
              (item, key) => <Player onRemovePlayer={e=>this.props.onClick(key)} name={item} key={key}/>)}
        </TableBody>
        </Table>
      </CardText>
    </Card>;
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