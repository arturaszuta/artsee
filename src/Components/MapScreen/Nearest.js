import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API_KEY } from 'react-native-dotenv';

import distance from '../../helpers/distanceBetweenCoords';

import Icon from 'react-native-vector-icons/FontAwesome5';
import mapStyles from '../../../styles/map';
import { colors } from '../../../styles/variables';

const { width, height } = Dimensions.get('window');

const nearbyArts = (arts, userLocation) => {
  let artsOut = {}
  Object.keys(arts).forEach(a => {
    let art = arts[a]
    const userCoords = {latitude: userLocation.latitude, longitude: userLocation.longitude}
    const artCoords = {latitude: art.latitude, longitude: art.longitude}
    const d = distance(userCoords, artCoords)
    if (d < 1) {
      artsOut[a] = art
    }
  })

  return artsOut
}

// GET a collection of the nearest art/graffiti in a 3 km radius
export const NearestArtsButton = ({setNearestArts, arts, userLocation}) => {
  return (
    <Icon name="map-marked" size={30} color={colors.color3} onPress={e => {
      const nearArts = nearbyArts(arts, userLocation)
      setNearestArts(nearArts)
    }} style={mapStyles.nearButton} title="nearby" >
    </Icon>
  )
}

export const NearestArtButton = ({getNearestArt, setDirectionState, userLocation}) => {
  return (
    <Icon name="crow" size={30} color={colors.color3} onPress={e => {
      getNearestArt(userLocation)
      setDirectionState(true)
    }} style={{...mapStyles.nearButton, bottom: 80}} title="nearest" >
    </Icon>
  )
}

export const NearestArtDirections = ({userLocation, destination, setDuration, setRegion, directionOn, setDirectionState}) => {
  if(userLocation && userLocation.latitude && destination && destination.latitude && directionOn) {
    let originPoint = {
      latitude: userLocation.latitude,
      longitude: userLocation.longitude
    };
    return (
      <View>
        <Marker 
          key = "destination"
          coordinate = {destination}
          pinColor = "green"
        />
        <MapViewDirections
          origin={originPoint}
          destination={destination}
          apikey={GOOGLE_API_KEY}
          strokeWidth={3}
          strokeColor={colors.directionPath}
          optimizeWaypoints={true}
            onStart={(params) => {
            }}
            onReady={result => {
              setDuration(result.duration)

              const pathRegion = {
                latitude: (result.coordinates[0].latitude + result.coordinates[result.coordinates.length - 1].latitude) / 2,
                longitude: (result.coordinates[0].longitude + result.coordinates[result.coordinates.length - 1].longitude) / 2,
                longitudeDelta: Math.abs(result.coordinates[0].latitude - result.coordinates[result.coordinates.length - 1].latitude) * 1.3,
                latitudeDelta: Math.abs(result.coordinates[0].longitude - result.coordinates[result.coordinates.length - 1].longitude) * 1.3
              }

              if (result.duration === 0) {
                setDuration(null);
                setDirectionState(false)
              }
          
              setRegion(pathRegion);
            }}
            onError={(errorMessage) => {
              console.error("we got an error during directing these kind folks:", errorMessage);
            }}
        />
      </View>
    )
  }
  return null
}

export const Duration = ({duration, setDuration, setDirectionState, setRegion, userLocation}) => {
  if (duration) {
    return (
      <View style={mapStyles.duration}>
        <Text style={mapStyles.durationText}>
          You are {'\n'}
          <Text style={{ fontSize: 30 }} >{Math.floor(duration)}</Text> {'\n'}
          minutes away from beauty
          {'\n\n'}
        </Text>
        <Icon name="times" onPress={e => {
          setDirectionState(false);
          setDuration(null);
          setRegion({
            ...userLocation,
            latitudeDelta: 0.0482,
            longitudeDelta: 0.0181,
          });
        }} size={30} color="red" title="endDirections" />
      </View>
    )
  };

  return null;
}