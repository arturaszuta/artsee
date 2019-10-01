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

export const NearestArtButton = ({getNearestArt}) => {
  return (
    <Icon name="crow" size={30} color={colors.color3} onPress={e => getNearestArt()} style={{...mapStyles.nearButton, bottom: 70}} title="nearest" >
    </Icon>
  )
}

export const nearestArtDirections = (userLocation, destination, setDuration, setRegion) => {
  if(userLocation && userLocation.latitude && destination && destination.latitude) {
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

              if (result.duration === 0) {
                setDuration(null)
              }
          
              setRegion({...result.coordinates[0], longitudeDelta: 0.0325, latitudeDelta: 0.0325});
            }}
            onError={(errorMessage) => {
              console.log("we got an error during directing these kind folks:", errorMessage);
            }}
        />
      </View>
    )
  }
}

export const Duration = ({duration}) => {
  if (duration) {
    return (
      <Text style={mapStyles.duration}>
        You are {'\n'}
        <Text style={{ fontSize: 30 }} >{Math.floor(duration)}</Text> {'\n'}
        minutes away from beauty
      </Text>
    )
  };

  return null;
}