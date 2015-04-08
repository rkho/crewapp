'use strict';

var React = require('react-native');
var MOCKED_CHAT_DATA = [
  {member: 'Richard', message: 'To the Apple Store!'},
  {member: 'Pavan', message: 'To the Munchery!'},
  {member: 'Arian', message: 'To the batmobile'}
];

var name;

var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ListView,
  AlertIOS
} = React;

var app = React.createClass({
  // App contains three components: ChatList, Name, and Submit, all within a View tag.
  render: function() {
    return (
      <View style={styles.container}>
        <ChatList />
        <Name />
        <Submit />
      </View>
    );
  }
});

var ChatList = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(MOCKED_CHAT_DATA)
    };
  },
  render: function() {
    return (
      <ListView style={styles.instructions}
        // Setting the data source
        dataSource={this.state.dataSource}
        // renderRow takes a row entry from the data source and displays it.
        renderRow={(rowData) => <Text>{rowData}</Text>} />
    );
  },
});

var Chat = React.createClass({
  render: function() {
    return (
      <Text style={styles.instructions}>
      </Text>
    );
  }
});

var Name = React.createClass({
  handleSubmit: function(e){
    name = e.nativeEvent.text;
  },
  render: function() {
    return (
      <View>
        <TextInput
          value="Please type in name"
          onSubmitEditing={(text) => this.handleSubmit(text)}
          style={styles.input} />
      </View>
    );
  }
});

var Submit = React.createClass({
  handleSubmit: function(e) {
    var chat = e.nativeEvent.text;
    MOCKED_CHAT_DATA.push({member: name, message: chat});
    console.log(MOCKED_CHAT_DATA);
  },
  render: function() {
    return (
    <View>
      <TextInput
        onSubmitEditing={this.handleSubmit}
        style={styles.input} />
    </View>
    );
  }
});

var styles = StyleSheet.create({
  input: {
    height: 20,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tan'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 200
  }
});

AppRegistry.registerComponent('app', () => app);
