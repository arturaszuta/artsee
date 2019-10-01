import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API_KEY } from 'react-native-dotenv';

import Icon from 'react-native-vector-icons/FontAwesome5';
import mapStyles from '../../../styles/map';
import { colors } from '../../../styles/variables';


const { width, height } = Dimensions.get('window');

// GET a collection of the nearest art/graffiti in a 3 km radius
export const NearestArtsButton = ({getNearestArts}) => {
  return (
    <Icon name="map-marked" size={30} color={colors.color3} onPress={e => getNearestArts()} style={mapStyles.nearButton} title="nearby" >
    </Icon>
  )
}

export const NearestArtButton = ({getNearestArt, setDirectionState}) => {
  return (
    <Icon name="crow" size={30} color={colors.color3} onPress={e => {
      getNearestArt()
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
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={result => {
              console.log(`Distance: ${result.distance} km`)
              console.log(`Duration: ${result.duration} min.`)
              console.log("Coordinates: ",result.coordinates[0])
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
              console.log("we got an error during directing these kind folks:", errorMessage);
            }}
        />
      </View>
    )
  }
  return null
}

export const Duration = ({duration, setDuration, setDirectionState, setRegion}) => {
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
            latitude: 43.644913,
            longitude: -79.402520,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }} size={30} color="red" title="endDirections" />
      </View>
    )
  };

  return null;
}