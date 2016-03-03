import React from 'react';
import Structure from './Structure';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux'
import {curry} from 'lodash'
import {submitSetStructure} from '../../actions/actionCreators'

import {RaisedButton} from 'material-ui'

const structureList = React.createClass({
  mixins: [PureRenderMixin],
  getData: function() {
    return this.props.structure || [];
  },
  render: function() {
    const structure = this.getData();
    const updater = curry(this.onFieldUpdate);
    return <div>            
      {structure.map(
        (item, key) => <Structure key={key} 
                                  level={key} 
                                  bb={item.get('bb')}
                                  sb={item.get('sb')}
                                  ante={item.get('ante')}
                                  onFieldUpdate={updater(key)} 
                        />)}
        <RaisedButton onClick={() => this.props.submitStructure(this.tempStructure)}> Submit </RaisedButton>
    </div>;
  }, 
  onFieldUpdate: function (index, field, value) 
  {        
    this.tempStructure = this.tempStructure 
      ? this.tempStructure.setIn([index, field], value.target.value) 
      : this.props.structure;    
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