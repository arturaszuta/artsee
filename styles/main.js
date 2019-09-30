import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default mainStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    height: '100%',
    width: "100%",
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight
  },
  txt: {
    backgroundColor: "dodgerblue",
    color: "white",
    width: "100%",
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30
  },
  tabBar: {
    height: 60 
  }
});