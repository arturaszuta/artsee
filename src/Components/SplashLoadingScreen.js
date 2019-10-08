import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
  Text,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import {
  fetchUser,
  findUserLocation,
  fetchToken,
  fetchAllComments
} from '../actions'


import { useApplicationData } from '../hooks/useApplicationData';

function SplashLoadingScreen({navigation, user, isFetching, isResolved, dispatch, reduxState}) {

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
    dispatch(fetchUser())
    dispatch(findUserLocation())

    _getState();
  }, [])

  return (
    <View style={{flex: 1}}>
      <Image source={require('../../assets/artseegif.gif')} style={{ flex: 1, width: undefined, height: undefined}}/>
    </View>
  )
}

function mapStateToProps(state) {
  const { user } = state
  const reduxState = state
  const { isFetching, isResolved } = user ? { isFetching: false, isResolved: true } :{ isFetching: true, isResolved: false };

  return {
    state,
    reduxState,
    user,
    isFetching,
    isResolved
  }
}

export default connect(mapStateToProps)(SplashLoadingScreen);