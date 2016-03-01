import React from 'react';
import { Button } from 'react-bootstrap';

export default (props) => {
  const {level, bb, sb, ante} = props;  
  return <div className='row'>
    <div className="col-xs-2 col-md-2"> {level} </div>
    <div className="col-xs-3 col-md-3"> <input type="text" value={bb} /> </div>
    <div className="col-xs-3 col-md-3"> <input type="text" value={sb} /> </div>
    <div className="col-xs-3 col-md-3"> <input type="text" value={ante} /></div>
  </div>;
}