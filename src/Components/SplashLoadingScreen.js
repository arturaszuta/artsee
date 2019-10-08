import React, { useEffect } from 'react';
import {
  View,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import {
  fetchUser,
  findUserLocation
} from '../actions'


import { useApplicationData } from '../hooks/useApplicationData';

function SplashLoadingScreen({navigation, doFetchUser, doFindUserLocation, resolved, dispatch}) {

  _getState = async () => {
    
    //This is where the calls are being made to get the
   
    const result = function() {
      setTimeout(() => {
        
      }, 3000)
    }
   
    result();
    // navigation.navigate(state.length === 0 ? 'Splash' : 'App');
    
    // switches to App or Auth screen
    
  };

  useEffect(() => {
  }, [])
  
  if (!resolved) {
    dispatch(fetchUser()),
    dispatch(findUserLocation())
  } else {
    setTimeout(() => {
      navigation.navigate('App');  
    }, 1000)
  }
  return (
    <View style={{flex: 1}}>
      <Image source={require('../../assets/artseegif.gif')} style={{ flex: 1, width: undefined, height: undefined}}/>
    </View>
  )
}

const mapStateToProps = state => ({
  resolved: state.asyncFetches
}) 

const mapDispatchToProps = dispatch => ({
  doFetchUser: dispatch(fetchUser()),
  doFindUserLocation: dispatch(findUserLocation())
})

export default connect(mapStateToProps)(SplashLoadingScreen);