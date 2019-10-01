import { StyleSheet, Dimensions } from 'react-native';
import { colors } from './variables';

const { width, height } = Dimensions.get('window');

export default mapStyles = {
  imgBack: {
    backgroundColor: colors.color1, 
    height: "100%"
  },
  imgStyle: { 
    height: "100%" 
  },
  mapsPopupInfo: {
    position: 'absolute',
    bottom: 0,
    width: "100%"
  },
  markerForm: {
    flex: 1
  },
  popupIcons: {
    position: 'absolute',
    right: 5,
    margin: 5
  },
  nearButton: {
    position: 'absolute', 
    bottom: 30, 
    right: 15
  },
  duration: {
    position: 'absolute',
    bottom: 15,
    width: 200,
    left: width / 2 - 100,
    backgroundColor: colors.color3,
    color: colors.text,
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    shadowColor: colors.color1,
    shadowRadius: 10
  }
}
