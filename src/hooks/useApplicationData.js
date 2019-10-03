import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { AsyncStorage } from 'react-native';

const SET_USER_ID = "SET_USER_ID";
const SET_ARTS_DATA = "SET_ARTS_DATA";
const SET_USER_LOCATION = "SET_USER_LOCATION";
const SET_MAP_MARKERS = "SET_MAP_MARKERS";
const SET_DESTINATION = "SET_DESTINATION";
const SET_LOADING = "SET_LOADING";
const SET_RESOLVED = "SET_RESOLVED";

const reducer = (state, action) => {
  switch(action.type) {
    case SET_USER_ID: {
      return {...state, userId: action.value}
    }
    case SET_ARTS_DATA: {
      return {...state, arts: action.value}
    }
    case SET_USER_LOCATION: {
      return {...state, userLocation: action.value}
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
};


export default useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    userId: null,
    arts: {},
    userLocation: {},
    mapMarkers: [],
    destination: {},
    loading: false,
    resolved: false
  });

  useEffect(() => {
    getUser()
    getUserLocation()
    getArts(state.userId)
  }, []);

  getUser = async () => {
    const usID = await AsyncStorage.getItem('userId');
    dispatch({ type: SET_USER_ID, value: usID })
  }

  getArts = async (userId) => {
    const response = await axios.get('https://artsee-back-end.herokuapp.com/api/userArts', {
      params: {
        user_id: userId
      }
    })

    let arts = {};
    response.data.forEach(art => {
      arts[art.id] = art
      art.latitude = Number(art.latitude);
      art.longitude = Number(art.longitude);
    })

    dispatch({ type: SET_ARTS_DATA, value: arts})
  }

  getUserLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log('Permission to access location was denied')
    };
  
    let location = await Location.getCurrentPositionAsync({});
    dispatch({ type: SET_USER_LOCATION, value: location.coords });
  };

  getNearestArts = async () => {
    await getUserLocation();
    let nearbyArts = await getFromCurrentLocation('https://artsee-back-end.herokuapp.com/api/near');

    dispatch({ type: SET_MAP_MARKERS, value: markerListGenerator(nearbyArts.data) });
  };

  getNearestArt = async () => {
    getUserLocation();
    getNearestArts();
    console.log("==|> inside getNearestArt")

    let nearest = await getFromCurrentLocation('https://artsee-back-end.herokuapp.com/api/nearest');
    
    let obj = nearest.data;
    obj.latitude = Number(obj.latitude);
    obj.longitude = Number(obj.longitude);

    dispatch({ type: SET_DESTINATION, value: obj })
  };

  getFromCurrentLocation = (url) => {
    return axios.get(url, {
      params: {
        latitude: state.userLocation.latitude,
        longitude: state.userLocation.longitude
      }
    })
  };

  setTag = async (art_id, type) => {
    let arts = {...state.arts};

    let art = {...arts[art_id]}
    art[type] = !art[type]

    arts[art_id] = art

    console.log("===|===> art is:", art)

    dispatch({ type: SET_ARTS_DATA, value: arts })
  }

  return {
    state, 
    getUserLocation,
    getNearestArts,
    getNearestArt,
    setTag
  };
};