import React from 'react';
import Structure from './Structure';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux'
import {toJS} from 'immutable'

const structureList = React.createClass({
  mixins: [PureRenderMixin],
  getData: function() {
    return this.props.structure || [];
  },
  render: function() {
    var structure = this.getData();
    console.log(structure.get(1));
    return <div>            
      {structure.map(
        (item, key) => <Structure key={key} 
                                  level={key} 
                                  bb={item.get('bb')}
                                  sb={item.get('sb')}
                                  ante={item.get('ante')} 
                        />)}
    </div>;
  }
});



// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {    
  }
}

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    structure: state.structure    
  };
}

export const StructureListContainer = connect(mapStateToProps, mapDispatchToProps)(structureList);