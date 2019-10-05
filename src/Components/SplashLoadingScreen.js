import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
  Text,
  Image
} from 'react-native';


import { useApplicationData } from '../hooks/useApplicationData';

export default function SplashLoadingScreen({navigation}) {

  _getState = async () => {
    
    //This is where the calls are being made to get the
   
    const result = function() {
      setTimeout(() => {
        navigation.navigate('App');  
      }, 3000)
    }
   
    result();
    // navigation.navigate(state.length === 0 ? 'Splash' : 'App');
    
    // switches to App or Auth screen
    
  };

  useEffect(() => {
    
    _getState();
  }, [])

  return (
    <View style={{flex: 1}}>
      <Image source={require('../../assets/artseegif.gif')} style={{ flex: 1, width: undefined, height: undefined}}/>
    </View>
  )
}