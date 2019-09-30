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
    axios.get('https://artsee-back-end.herokuapp.com/arts')
    .then(values => {
      markerList = [...state.mapMarkers, ...markerListGenerator(values.data)]

      dispatch({ type: SET_MAP_MARKERS, value: markerList })
    })
    .catch(err => console.log("==|==>> error from axios:", err))
  }, [])

  markerListGenerator = (list) => {
    return list.map(item => {
      let obj = item;
      obj.latitude = Number(obj.latitude);
      obj.longitude = Number(obj.longitude);
      
      return obj;
    })
  }

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

  getNearestArts = async () => {
    await getUserLocation()
    nearbyArts = await axios.get('https://artsee-back-end.herokuapp.com/api/nearest', {
      params: {
        latitude: state.userLocation.latitude,
        longitude: state.userLocation.longitude
      }
    })

    dispatch({ type: SET_MAP_MARKERS, value: markerListGenerator(nearbyArts.data) })
  }

  return {
    state, 
    getUserLocation,
    getNearestArts
  }
}