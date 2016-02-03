import React from 'react';

export default React.createClass({
  render: function() {
    return React.cloneElement(this.props.children, {data: "Hello Worldz"});
  }
});
