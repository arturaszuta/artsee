import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const SET_USER_LOCATION = "SET_USER_LOCATION";
const SET_MAP_MARKERS = "SET_MAP_MARKERS";
const SET_DESTINATION = "SET_DESTINATION";
const SET_LOADING = "SET_LOADING";
const SET_RESOLVED = "SET_RESOLVED";

const reducer = (state, action) => {
  switch(action.type) {
    case SET_USER_LOCATION: {
      return {...state, userLocation: action.value}
    }
    case SET_MAP_MARKERS: {
      return {...state, mapMarkers: action.value}
    }
    case SET_DESTINATION: {
      return {...state, destination: action.value}
    }
    case SET_LOADING: {
      return {...state, loading: action.loading, resolved: action.resolved}
    }
    case SET_RESOLVED: {
      return {...state, loading: action.loading, resolved: action.resolved}
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
    mapMarkers: [],
    destination: {},
    loading: false,
    resolved: false
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
    console.log("=|=+> inside getUserLocation")
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log('Permission to access location was denied')
    }
  
    let location = await Location.getCurrentPositionAsync({});
    dispatch({ type: SET_USER_LOCATION, value: location.coords })
  };

  getNearestArts = async () => {
    await getUserLocation()
    nearbyArts = await getFromCurrentLocation('https://artsee-back-end.herokuapp.com/api/near')

    dispatch({ type: SET_MAP_MARKERS, value: markerListGenerator(nearbyArts.data) })
  }

  getNearestArt = async () => {
    getUserLocation()
    console.log("==|> inside getNearestArt")

    let nearest = await getFromCurrentLocation('https://artsee-back-end.herokuapp.com/api/nearest')
    
    let obj = nearest.data;
    obj.latitude = Number(obj.latitude);
    obj.longitude = Number(obj.longitude);

    dispatch({ type: SET_DESTINATION, value: obj })
  }

  getFromCurrentLocation = (url) => {
    return axios.get(url, {
      params: {
        latitude: state.userLocation.latitude,
        longitude: state.userLocation.longitude
      }
    })
  }

  return {
    state, 
    getUserLocation,
    getNearestArts,
    getNearestArt
  }
}