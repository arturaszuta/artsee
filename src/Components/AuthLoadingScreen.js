import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View
} from 'react-native';

export default function AppLoadingScreen({navigation}) {


  // fetch token and navigate to appropriate screen
  _fetchToken = async () => {
    const token = await AsyncStorage.getItem('token');
    // switches to App or Auth screen
    navigation.navigate(token ? 'Splash' : 'Auth');
    
  };

  useEffect(() => {
    _fetchToken();
  }, [])

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  )
}