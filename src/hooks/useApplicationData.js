import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { AsyncStorage } from 'react-native';

const SET_USER = "SET_USER";
const SET_TOKEN = "SET_TOKEN";
const SET_ARTS_DATA = "SET_ARTS_DATA";
const SET_USER_LOCATION = "SET_USER_LOCATION";
const SET_MAP_MARKERS = "SET_MAP_MARKERS";
const SET_DESTINATION = "SET_DESTINATION";
const SET_LOADING = "SET_LOADING";
const SET_RESOLVED = "SET_RESOLVED";
const SET_USERS = "SET_USERS";

const reducer = (state, action) => {
  switch(action.type) {
    case SET_USER: {
      return {...state, user: action.value}
    }
    case SET_TOKEN: {
      return {...state, token: action.value}
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
    case SET_USERS: {
      return {...state, users: action.value}
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

export const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    users: {},
    token: null,
    arts: {},
    userLocation: {},
    mapMarkers: [],
    destination: {},
    loading: false,
    resolved: false
  });

  updateArts = async () => {
    await getArts()

    return true
  }
  useEffect(() => {
    getAll = async () => {
      // await userLogout()
      await getToken()
      await getUser()
      await getUserLocation()
      await getArts()
    }
    getAll()
  }, [])
 

  getUser = async () => {
    const userId = await AsyncStorage.getItem('userId');

    return fetch(`https://artsee-back-end.herokuapp.com/users/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: state.token
      }
    })
    .then(res => {
      return res.json()
        .then(res => {
          dispatch({ type: SET_USER, value: res })
        })
    })
    .catch(err => {
      userLogout()
      console.log("==||==> error from getUser:",err)
    })
  }

  getToken = () => {
    return AsyncStorage.getItem('token')
      .then(res => {
        dispatch({ type: SET_TOKEN, value: res })
      })
  }

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

  getArts = () => {
    return axios.get('https://artsee-back-end.herokuapp.com/api/userArts', {
      params: {
        user_id: state.user.id
      }
    })
      .then(response => {
        let arts = {};
        response.data.forEach(art => {
          arts[art.id] = art
          art.latitude = Number(art.latitude);
          art.longitude = Number(art.longitude);
        })
        dispatch({ type: SET_ARTS_DATA, value: arts})
      })
  }

  getUserLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log('Permission to access location was denied')
    };
  
    let location = await Location.getCurrentPositionAsync({});
    dispatch({ type: SET_USER_LOCATION, value: location.coords });
  };

  getUsers = () => {
    return axios.get('https://artsee-back-end.herokuapp.com/users')
      .then(res => {
        let users = {}; 
        res.data.forEach(user => {
          users[user.id] = user
        })

        dispatch({ type: SET_USERS, value: users})
      })
  }

  getNearestArts = async () => {
    await getUserLocation();
    let nearbyArts = await getFromCurrentLocation('https://artsee-back-end.herokuapp.com/api/near');

    dispatch({ type: SET_MAP_MARKERS, value: markerListGenerator(nearbyArts.data) });
  };

  getNearestArt = async () => {
    getUserLocation();
    getNearestArts();

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

  setTag = (art_id, type) => {
    let arts = {...state.arts};

    let art = {...arts[art_id]}
    art[type] = !art[type]

    arts[art_id] = art

    const q = 'https://artsee-back-end.herokuapp.com/tags' 
      + '?user_id=' + state.user.id 
      + '&art_id=' + art_id 
      + '&type=' + type 
      + '&value=' + art[type];

    return fetch(q, {
      method: 'POST'
    })
      .then(res => {
        dispatch({ type: SET_ARTS_DATA, value: arts })
      })

  }

  return {
    state, 
    getUserLocation,
    getNearestArts,
    getNearestArt,
    setTag,
    updateArts
  };
};
