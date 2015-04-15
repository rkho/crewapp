var styles = require('./styles.js');
var React = require('react-native');

// var t = require('tcomb-form-native');
// var Form = t.form.Form;

var ChatRoom = require('../ChatRoom');

var {
  Text,
  View,
  TouchableHighlight,
  TextInput,
  Form,
  SwitchIOS,
  TouchableOpacity
} = React;

var Survey = React.createClass({
  getInitialState: function() {
    return {
      option1: null,
      option2: null,
      option3: null,
      option4: null,
      option5: null,
    }
  },
  render: function() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.title} underlayColor="#99d9f4">
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      <Text>Cats</Text>
      <SwitchIOS
        onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
        style={styles.title}
        value={this.state.falseSwitchIsOn} />
        <Text>Dogs</Text>
      </View>
    )
  }
})

module.exports = Survey;
