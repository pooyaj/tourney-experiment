import React from 'react';

import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import FlatButton from 'material-ui/lib/flat-button';





export default (props) => {
  const playerName = props.name;
  const removePlayerHandler = props.onRemovePlayer;
  return <TableRow>
      <TableRowColumn>{playerName}</TableRowColumn>
      <TableRowColumn>
        <FlatButton 
          label="Remove" 
          primary={true}
          onClick={removePlayerHandler}
        />
       </TableRowColumn>
    </TableRow>; 
}