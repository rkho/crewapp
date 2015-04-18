var React = require('react-native');
var { StyleSheet } = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  formBox: {
    marginTop: 30,
    position: 'relative'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    marginBottom: 10,
    justifyContent: 'center'
  },
  grayButton: {
    height: 36,
    backgroundColor: '#CCCCCC',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginBottom: 10,
    justifyContent: 'center'
  },
  scrollView: {
    backgroundColor: '#6A85B1',
    height: 300,
    flex: 3
  },
  horizontalScrollView: {
    height: 120
  }
});

module.exports = styles;
