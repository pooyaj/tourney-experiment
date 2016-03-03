import React from 'react';

import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import {RaisedButton} from 'material-ui'

export default (props) => {
  const playerName = props.name;
  const removePlayerHandler = props.onRemovePlayer;
  return <TableRow>
      <TableRowColumn>{playerName}</TableRowColumn>
      <TableRowColumn><RaisedButton onClick={removePlayerHandler}>Remove</RaisedButton></TableRowColumn>
    </TableRow>; 
}