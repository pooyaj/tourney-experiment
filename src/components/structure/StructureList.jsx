import React from 'react';
import {Map} from 'immutable';
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

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableHeader from 'material-ui/lib/table/table-header';
import TableBody from 'material-ui/lib/table/table-body';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';



const structureList = React.createClass({
  mixins: [PureRenderMixin],
  getData: function() {
    return this.props.structure || [];
  },
  componentWillMount: function () {
    this.state = {structure: []};  
  },
  componentWillReceiveProps: function (nextProps) {
    this.setState({structure: nextProps.structure});
  }, 
  render: function() {
    const structure = this.state.structure;
    const updater = curry(this._onFieldUpdate);
     
    return <div><Card>  
      <CardHeader
        title="Tourney Structure"
        subtitle="Enter tournament time, blind, and ante structure"
      />
      <CardText>       
      <Table>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn style={{align: 'left'}}>Level</TableHeaderColumn>
            <TableHeaderColumn>Small Blind</TableHeaderColumn>
            <TableHeaderColumn>Big Blind</TableHeaderColumn>
            <TableHeaderColumn>Ante</TableHeaderColumn>
            <TableHeaderColumn>Time</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>                
          {structure.map(
            (item, key) => <Structure key={key} 
                                      level={key} 
                                      bb={item.get('bb')}
                                      sb={item.get('sb')}
                                      ante={item.get('ante')}
                                      time={item.get('time')}
                                      onFieldUpdate={updater(key)} 
                            />)}
        </TableBody>
      </Table>
      </CardText>
      <CardActions>
        <FlatButton label="Add Row" onClick={() => this._addRow()}/>
        <FlatButton onClick={() => this.props.submitStructure(this.state.structure)} label='Submit' />
        <FlatButton label="Reset" onClick={() => this._resetForm()}/>
      </CardActions>             
    </Card></div>;
  }, 
  _addRow: function () {
    const lastRowId = this.state.structure.keySeq().max();
    
    const lastRowData = this.state.structure.get(lastRowId);
    console.log("last row:", lastRowData);
    const nextState = this.state.structure.setIn([lastRowId+1], Map({
      bb: lastRowData.get('bb') * 2, 
      sb: lastRowData.get('sb') * 2 || 0, 
      ante: lastRowData.get('ante') * 2 || 0, 
      time: lastRowData.get('time') || 0
    }));
    this.setState({structure: nextState})
  },
  _resetForm: function () {
    this.setState({structure: this.props.structure});
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