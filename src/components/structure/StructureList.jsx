import React from 'react';
import Structure from './Structure';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux'
import {curry} from 'lodash'
import {submitSetStructure} from '../../actions/actionCreators'

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';


const structureList = React.createClass({
  mixins: [PureRenderMixin],
  getData: function() {
    return this.props.structure || [];
  },
  componentWillMount: function () {
    this.state = {structure: this.getData()};  
  },
  render: function() {
    console.log(this.state.structure);
    const structure = this.getData();
    const updater = curry(this._onFieldUpdate);
     
    return <div><Card>  
      <CardHeader
        title="Tourney Structure"
        subtitle="Enter tournament time, blind, and ante structure"
      />
      <CardText>              
      {structure.map(
        (item, key) => <Structure key={key} 
                                  level={key} 
                                  bb={item.get('bb')}
                                  sb={item.get('sb')}
                                  ante={item.get('ante')}
                                  onFieldUpdate={updater(key)} 
                        />)}
      </CardText>
      <CardActions>
        <FlatButton label="Add Row" onClick={() => this._addRow()}/>
        <FlatButton onClick={() => this.props.submitStructure(this.state.structure)} label='Submit' />
        <FlatButton label="Reset" />
      </CardActions>             
    </Card></div>;
  }, 
  _addRow: function () {
    
  },
  _onFieldUpdate: function (index, field, value) 
  {
    this.setState({
      structure: this.state.structure.setIn([index, field], value.target.value)
    });
  }, 
  tempStructure: null
});

function mapDispatchToProps(dispatch) {
  return {
    submitStructure: (val) => dispatch(submitSetStructure(val)) 
  }
}

function mapStateToProps(state) {
  return {
    structure: state.structure    
  };
}

export const StructureListContainer = connect(mapStateToProps, mapDispatchToProps)(structureList);