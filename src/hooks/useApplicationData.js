import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const SET_USER_LOCATION = "SET_USER_LOCATION";
const SET_MAP_MARKERS = "SET_MAP_MARKERS";

const reducer = (state, action) => {
  switch(action.type) {
    case SET_USER_LOCATION: {
      return {...state, userLocation: action.value}
    }
    case SET_MAP_MARKERS: {
      return {...state, mapMarkers: action.value}
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}


export default useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    userLocation: {},
    mapMarkers: []
  })

  useEffect(() => {
    getUserLocation()
  }, [])

  useEffect(() => {
    Promise.all([
      axios.get('https://artsee-back-end.herokuapp.com/arts/8'),
      axios.get('https://artsee-back-end.herokuapp.com/arts/9'),
      axios.get('https://artsee-back-end.herokuapp.com/arts/6'),
      axios.get('https://artsee-back-end.herokuapp.com/arts/21'),
      axios.get('https://artsee-back-end.herokuapp.com/arts/22'),
      axios.get('https://artsee-back-end.herokuapp.com/arts/23'),
      axios.get('https://artsee-back-end.herokuapp.com/arts/24')
    ])
    .then(values => {
      markerList = [...state.mapMarkers]
      values.forEach(res => {
        console.log("==>> result from axios:", res.data)
        markerList.push(res.data)
      })

      console.log("==|=> markerList:", markerList)

      dispatch({ type: SET_MAP_MARKERS, value: markerList })
    })
    .catch(err => console.log("==|==>> error from axios:", err))
  }, [])

  getUserLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
  
    let location = await Location.getCurrentPositionAsync({});
    dispatch({ type: SET_USER_LOCATION, value: location.coords })
  };

  return {
    state, 
    getUserLocation
  }
}