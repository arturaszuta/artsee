import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { AsyncStorage } from 'react-native';

const SET_MAP_MARKERS = "SET_MAP_MARKERS";
const SET_DESTINATION = "SET_DESTINATION";

const reducer = (state, action) => {
  switch(action.type) {
    case SET_DESTINATION: {
      return {...state, destination: action.value}
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

export default useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    destination: {}
  });

  userLogout = () => {
    _handleLogout = () => {
        AsyncStorage.clear();
        navigation.navigate('Auth');
    };

    return _handleLogout()
      .then(res => {
        dispatch({ type: SET_USER, value: null })
      })
  }

  getNearestArt = async (userLocation) => {

    let nearest = await getFromCurrentLocation('https://artsee-back-end.herokuapp.com/api/nearest', userLocation);
    
    let obj = nearest.data;
    obj.latitude = Number(obj.latitude);
    obj.longitude = Number(obj.longitude);

    dispatch({ type: SET_DESTINATION, value: obj })
  };

  getFromCurrentLocation = (url, userLocation) => {
    return axios.get(url, {
      params: {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude
      }
    })
  };

  return {
    state, 
    getNearestArt
  };
};
