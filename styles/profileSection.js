import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { colors } from './variables';

const { width, height } = Dimensions.get('window');

export default profileStyle = StyleSheet.create({
  profileBG: {
    height: "55%",
    width: "100%",
    justifyContent: "space-between",
    flex: 1
  },
  thumbnail: {
    height: 150,
    width: 150,
    borderRadius: 75,
    marginTop: 60,
    marginLeft: 5,
    marginBottom: 10,
    borderColor: '#fff',
    borderWidth: 3
  },
  username: { 
    fontSize: 30, 
    alignSelf: "flex-end", 
    marginRight: 20,
    paddingBottom: 10,
    color: colors.color1
  },
  following: { 
    flexDirection: "column", 
    alignItems: "flex-end" 
  },
  followers: { 
    borderRadius: 40, 
    marginRight: 10, 
    borderColor: colors.color4,
    borderWidth: 2, 
    width: 35, 
    height: 35, 
    resizeMode: 'cover'}
})