import React from 'react';
import { Button } from 'react-bootstrap';

export default (props) => {
  const {level, bb, sb, ante, onFieldUpdate} = props;  
  return <div className='row'>
    <div className="col-xs-2 col-md-2"> {level} </div>
    <div className="col-xs-3 col-md-3"> 
      <input type="text" 
        defaultValue={bb} 
        onChange={onFieldUpdate('bb')}/> 
    </div>
    <div className="col-xs-3 col-md-3"> 
      <input type="text" 
        defaultValue={sb}
        onChange={onFieldUpdate('sb')}/>       
    </div>
    <div className="col-xs-3 col-md-3"> 
      <input type="text" 
        defaultValue={ante}
        onChange={onFieldUpdate('ante')}/>
    </div>
  </div>;
}