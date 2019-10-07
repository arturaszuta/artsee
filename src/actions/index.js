import axios from 'axios';
import { AsyncStorage } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const SET_USER = "SET_USER";
const SET_TOKEN = "SET_TOKEN";
const SET_ARTS_DATA = "SET_ARTS_DATA";
const SET_USER_LOCATION = "SET_USER_LOCATION";
const SET_MAP_MARKERS = "SET_MAP_MARKERS";
const SET_DESTINATION = "SET_DESTINATION";
const SET_LOADING = "SET_LOADING";
const SET_RESOLVED = "SET_RESOLVED";
const SET_USERS = "SET_USERS";
const SET_TAG = "SET_TAG";
const APPLY_FILTER = "APPLY_FILTER";
const SET_FILTER_ARRAY = "SET_FILTER_ARRAY";

const fetching = () => {
  return {
    type: SET_LOADING
  }
}

const resolveFetch = () => {
  return {
    type: SET_RESOLVED
  }
}

const setUser = (user) => {
  return {
    type: SET_USER,
    user
  }
}

const setToken = (token) => {
  return {
    type: SET_TOKEN,
    token
  }
}

const setArts = (arts) => {
  return {
    type: SET_ARTS_DATA,
    arts
  }
}

export const setFilterArray = (array) => {
  return {
    type: SET_FILTER_ARRAY,
    array
  }
}
const setUserLocation = (userLocation) => {
  return {
    type: SET_USER_LOCATION,
    userLocation
  }
}

const setDestination = (destination) => {
  return {
    type: SET_DESTINATION,
    destination
  }
}

export const setNearestArts = arts => {
  return {
    type: SET_ARTS_DATA,
    arts
  }
}

export const setTag = (id, opt, value) => {
  return {
    type: SET_TAG,
    id,
    opt,
    value
  }
}

export const applyFilter = (filterArts) => {
  return {
    type: APPLY_FILTER,
    filterArts
  }
}

export const fetchToken = () => dispatch => {
  dispatch(fetching())
  return AsyncStorage.getItem('token')
    .then(res => {
      dispatch(setToken(res))
    })
}

export const fetchUser = () => dispatch => {
  let token = null
  return AsyncStorage.getItem('token')
    .then(res => {
      token = res
      return AsyncStorage.getItem('userId')
        .then(userId => {
          return fetch(`https://artsee-back-end.herokuapp.com/users/${userId}`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: token
            }
          })
            .then(res => {
              return res.json()
                .then(res => {
                  dispatch(setUser(res))
                  dispatch(fetchArts(res.id))
                  dispatch(resolveFetch())
                })
            })
            .catch(err => {
              AsyncStorage.clear()
              console.log("==||==> error from getUser:",err)
            })
        })
    })
}

export const fetchArts = (userId) => dispatch => {

  return axios.get('https://artsee-back-end.herokuapp.com/api/mostlikedart', {
      params: {
        user_id: userId
      }
    })
      .then(response => {
        let arts = {};
        let filterArray = [];
        response.data.forEach(art => {
          filterArray.push(art.id)
          arts[art.id] = art
          art.latitude = Number(art.latitude);
          art.longitude = Number(art.longitude);
        })
        console.log(filterArray)
        dispatch(setFilterArray(filterArray));
        dispatch(setArts(arts))
      })
}

export const findUserLocation = () => async dispatch => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    console.log('Permission to access location was denied')
  };

  return Location.getCurrentPositionAsync({})
    .then(location => {
      dispatch(setUserLocation(location.coords));
    })
}

export const postTag = (id, opt, value, userID) => async dispatch => {
  fetch(`https://artsee-back-end.herokuapp.com/tags/?user_id=${userID.id}&art_id=${id}&type=${opt}&value=${value}`, {
            method: "POST"
}).then(result => result.json()).then(res => res)
  dispatch(setTag(id,
    opt,
    value))
}