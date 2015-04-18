var styles = require('./styles.js');
var React = require('react-native');

var t = require('tcomb-form-native');
var Form = t.form.Form;

var {
  Text,
  View,
  TouchableHighlight,
  ScrollView,
} = React;

var Event = t.struct({
  place: t.Str,
  address: t.Str,
})

var options = {
  place: {
    placeholder: 'Event/Place Name',
    autoCapitalize: true,
    clearButtonMode: true
  },
  address: {
    placeholder: 'Address'
  }
}

var MakePlans = React.createClass({
  getInitialState: function() {
    return {
      place: null,
      address: null,
    };
  },
  onPress: function() {
    // Gather entered fields and setState, then navigate backwards and pass props over.
    this.setState({
      place: this.refs.form.getValue().place,
      address: this.refs.form.getValue().address,
    });
    this.navigateTo();
  },
  navigateTo: function() {
    // Navigate back to the ChatRoom, passing these props over and making a post with the information.
    // Do not 'push' to this location, since we're not trying to have a back button to this form again.
    this.props.navigator.pop({
      passProps: this.state
    });
  },
  render: function() {
    return (
      // Add forms here
      <View style={styles.container}>
        <View style={styles.formBox}>
        <Form
          ref="form"
          type={Event}
          option={options} />
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor="#99d9f4">
          <Text style={styles.buttonText}>Create</Text>
        </TouchableHighlight>
        </View>
      </View>
    )
  }
})

module.exports = MakePlans;
