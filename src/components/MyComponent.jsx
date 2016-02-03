import React from 'react';
/*
  one note here, this only works with createClass style, but if using 
  es6 class, can use shouldComponentUpdate. Can use this for more info too: 
  https://github.com/gaearon/react-pure-render
  overall, this only needed because we are using immutable, and redux, and we 
  are sure shallow comparison would be enough to detect state changes. 
*/
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux'
import {addFoo} from '../actions/actionCreators'

const myComponent = React.createClass({
  mixins: [PureRenderMixin],
  getData: function() {
    return this.props.data || [];
  },
  render: function() {
    return <div className="myComponent">
      <input type='text' ref='input' value={this.props.data}/>
      <button onClick={(e) => this.props.onSubmit(this.refs.input.value.trim())}>
        Submit
       </button>
    </div>;
  }
});


// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (data) => dispatch(addFoo(data))
  }
}

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    data: state['foo']
  };
}

export const MyComponentContainer = connect(mapStateToProps, mapDispatchToProps)(myComponent);