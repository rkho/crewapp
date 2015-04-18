var styles = require('./styles.js');
var React = require('react-native');

var t = require('tcomb-form-native');
var Form = t.form.Form;

var MakePlans = require('../MakePlans');

var io = require('react-native-sockets-io');

var name = name || 'anonymous';

var {
  Text,
  View,
  TouchableHighlight,
  ScrollView
} = React;

var Message = t.struct({
  message: t.Str
});

var options = {
  fields: {
    message: {
      placeholder: 'Enter a message',
      error: 'You have to enter a message!',
      multiline: true
    }
  }
};

var ChatRoom = React.createClass({
  getInitialState: function() {
    return {
      io: io('http://chat.trycrewapp.com', {jsonp: false}),
      room: this.props.group,
      place: this.props.place,
      address: this.props.address
    };
  },
  navigateTo: function() {
    this.props.navigator.push({
      title: 'Make Plans',
      component: MakePlans
    });
  },
  propTypes: {
    group: React.PropTypes.any
  },
  componentDidMount: function() {
    this.state.io.emit('chat message', {name: name, chat: 'hello'});
    this.getRoom();
  },
  getRoom: function() {
    var that = this;
    this.state.io.on('connect', function() {
      that.state.io.emit('join room', that.state.room);
      that.state.io.emit('message', 'You\'ve joined: ' + that.state.room);
    });
  },

  render: function() {
    return (
      <View style={styles.container}>
        <ChatList socket={this.state.io} />
        <MessageForm socket={this.state.io} />
        <TouchableHighlight style={styles.grayButton} onPress={this.navigateTo} underlayColor="#99d9f4">
          <Text style={styles.buttonText}>Make Plans</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

// List of messages
var ChatList = React.createClass({
  getInitialState: function(){
    return {messages: []};
  },
  propTypes: {
    socket: React.PropTypes.any
  },
  componentDidMount: function(){
    this.props.socket.on('message', (msg) =>{
      this.state.messages.push(msg);
      this.forceUpdate();
    });
  },
  render: function(){
    return (
      <ScrollView
        scrollEventThrottle={200}
        contentInset={{top: 0}}
        style={styles.scrollView}>
        {
          this.state.messages.map(m => {
            return <Text key={m.id}>{name}: {m}</Text>;
          })
        }
      </ScrollView>
    );
  }
});

// Unified Input Field

var MessageForm = React.createClass({
  componentDidMount: function() {
    console.log(this.props);
  },
  onPress: function() {
    var value = this.refs.form.getValue();
    if (value) {
      this.send(value);
    }
  },
  send: function(message) {
    this.props.socket.emit('message', message);
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Form
          ref="form"
          type={Message}
          option={options} />
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor="#99d9f4">
          <Text style={styles.buttonText}>Send</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

module.exports = ChatRoom;
