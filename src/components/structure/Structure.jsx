import React from 'react';
import TextField from 'material-ui/lib/text-field';

import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';


export default (props) => {
  const {level, bb, sb, ante, time, onFieldUpdate} = props;  
  return <TableRow displayBorder={false}>
    <TableRowColumn> {level} </TableRowColumn>
    <TableRowColumn> 
      <TextField type="text" 
        defaultValue={bb} 
        onChange={onFieldUpdate('bb')}/> 
    </TableRowColumn>
    <TableRowColumn> 
      <TextField type="text" 
        defaultValue={sb}
        onChange={onFieldUpdate('sb')}/>       
    </TableRowColumn>
    <TableRowColumn> 
      <TextField type="text" 
        defaultValue={ante}
        onChange={onFieldUpdate('ante')}/>
    </TableRowColumn>
    <TableRowColumn> 
      <TextField type="text" 
        defaultValue={time}
        onChange={onFieldUpdate('time')}/>
    </TableRowColumn>
  </TableRow>;
}