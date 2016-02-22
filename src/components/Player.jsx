import React from 'react';
import { Button } from 'react-bootstrap';

export default (props) => {
  const playerName = props.name;
  const removePlayerHandler = props.onRemovePlayer;
  return <div className='row'>
    <div className="col-md-8"> {playerName} </div>
    <div className="col-md-3"> <Button onClick={removePlayerHandler}>Remove</Button></div>          
  </div>;
}