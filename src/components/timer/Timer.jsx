import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux'
import {submitRemovePlayer} from '../../actions/actionCreators'


import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';

const timer = React.createClass({
  mixins: [PureRenderMixin],
  componentWillMount: function () {
    this.state = {time:0, timeout: null};
  },
  componentDidMount: function () {    
    const timeout = this.props.running ? setInterval(this.updateCounter, 1000) : null;
    this.updateCounter();
    this.setState({timeout});    
  },
  componentWillUnmount: function () {
    clearTimeout(this.state.timeout);
    this.setState({timeout: null});
  },
  componentWillReceiveProps: function (nextProps) {
    console.log("next propping d", nextProps);
    this.updateCounter();
    if (!nextProps.running && nextProps.running !== this.props.running) {
      console.log("next propping 2", nextProps);
      clearTimeout(this.state.timeout);
      this.setState({timeout: null});
    } else if (nextProps.running && nextProps.running !== this.props.running) {
      console.log("next propping 1", nextProps.running);
      let timeout = setInterval(this.updateCounter, 1000);
      this.setState({timeout})    
    } else {
      this.updateCounter(nextProps.elapsed + this.now() - nextProps.lastSave);
    }
  },   
  getData: function() {
    return this.props.data || [];
  },
  render: function() {
    var data = this.getData();
    return <Card>
      <CardHeader
        title="Timer"
      />
      <CardText>                  
        Time {this.state.time}
      </CardText>
      <CardActions>
        <FlatButton label="Pause" onClick={() => this._addRow()}/>
        <FlatButton label='Resume' onClick={() => this.props.submitStructure(this.state.structure)}  />     
      </CardActions>        
    </Card>;
  }, 
  updateCounter: function (t) {
    const time = t || this.props.elapsed + (this.now() - this.props.lastSave) || 0;
    this.setState({
      time
    });
  }, 
  now: function () {
    const myOffset = 0;
    return Date.now() + myOffset;
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
    elapsed: state.timer.get('elapsed'),
    running: state.timer.get('running'),
    lastSave: state.timer.get('lastSave')
  };
}

export const TimerContainer = connect(mapStateToProps, mapDispatchToProps)(timer);