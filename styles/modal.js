import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { colors } from './variables';

const { width, height } = Dimensions.get('window');

export default modalStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    height: '100%',
    width: "100%",
    backgroundColor: colors.text,
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight,
    alignItems: 'center', 
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center' 
  },
  txt: {
    flex: 1,
    color: colors.color1,
    textAlignVertical: 'center',
    fontSize: 30,
    textAlign: 'center',
    width: "100%",
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30
  },
  image: {
    width: width,
    height: width
  },
  icons: {
    alignItems: 'center', 
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  dismiss: {
    backgroundColor: colors.text,
    color: colors.color1
  }
});