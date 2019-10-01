import React, { Component, useEffect } from 'react';
import { Animated, Platform, StyleSheet, Text, View, ImageBackground, Button, Dimensions } from 'react-native';
import { Container, Header, Left, Body, Right, Content } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API_KEY } from 'react-native-dotenv';

import useApplicationData from '../hooks/useApplicationData';

import mapStyles from '../../styles/map';
import Icon from 'react-native-vector-icons/FontAwesome5';

const flag = <Icon name="flag" size={23} color="#fff" />;
const heart = <Icon name="heart" size={23} color="#fff" />;
const eye = <Icon name="eye" size={23} color="#fff" />;
const child = <Icon name="child" size={20} color="blue" />;
const spraycan = <Icon name="spray-can" size={20} color="purple" />;

const { width, height } = Dimensions.get('window');

const MapScreen = ({navigation}) => {
  const {
    state,
    getUserLocation,
    getNearestArts,
    getNearestArt
  } = useApplicationData();

  navigationOptions = {
    title: 'Map'
  };


  const UserLocation = () => {
    if (state.userLocation && state.userLocation.latitude) {
      console.log("==>>==>> state.userLocation:",state.userLocation)
      return (
        <Marker
          key = "user"
          coordinate = {state.userLocation}
        >
          {child}
        </Marker>
      )
    }
  }

  // GET a collection of the nearest art/graffiti in a 3 km radius
  const NearestArtsButton = () => {
    return (
      <Icon name="map-marked" size={30} color="#fff" onPress={e => getNearestArts()} style={mapStyles.nearButton} title="nearby" >
      </Icon>
    )
  }

  const NearestArtButton = () => {
    return (
      <Icon name="crow" size={30} color="#fff" onPress={e => getNearestArt()} style={{...mapStyles.nearButton, bottom: 70}} title="nearest" >
      </Icon>
    )
  }


  const NearestArtDirections = () => {
    if(state.userLocation && state.userLocation.latitude && state.destination && state.destination.latitude) {
      let originPoint = {
        latitude: state.userLocation.latitude,
        longitude: state.userLocation.longitude
      }
      return (
        <View>
          <Marker 
            key = "destination"
            coordinate = {state.destination}
            pinColor = "green"
          />
          <MapViewDirections
            origin={originPoint}
            destination={state.destination}
            apikey={GOOGLE_API_KEY}
            strokeWidth={3}
            strokeColor="hotpink"
            optimizeWaypoints={true}
              onStart={(params) => {
                console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
              }}
              onReady={result => {
                console.log('Distance: ${result.distance} km')
                console.log('Duration: ${result.duration} min.')
                
                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: (width / 20),
                    bottom: (height / 20),
                    left: (width / 20),
                    top: (height / 20),
                  }
                });
              }}
              onError={(errorMessage) => {
                console.log("we got an error during directing these kind folks:", errorMessage);
              }}
          />
        </View>
      )
    }
  }

  const marker = () => {
    if (state.mapMarkers) {           
      // console.log("==|==> from inside Map, marker(), mapMarkers: ", state.mapMarkers)
      return state.mapMarkers.map(marker => {
        return (
          <Marker draggable
            key = {marker.id}
            coordinate={marker}
            // onPress={e => {
            //   this.setState({
            //     component: true,
            //     componentUrl: marker.url,
            //     componentTitle: marker.title || "This piece has no title"
            //   })
            // }}
          >
            {spraycan}
          </Marker>
        )
      })
    }
  }

  return (
    <Container style={{ flex: 1 }}>
       <Header style={{backgroundColor:'dodgerblue'}}>
        <Left style={{flex:1}}><Text style={{color:'#fdfffc', fontWeight:'bold', fontSize:18}}>artsee</Text></Left>
        <Body style={{flex:1, alignItems:'center', justifyContent: "center"}}>
        </Body>
        <Right style={{flex:1}}/>
      </Header>
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 43.644913,
            longitude: -79.402520,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          ref={c => this.mapView = c}
        >
          {marker()}
          {UserLocation()}
          {NearestArtDirections()}
        </MapView>
        <NearestArtButton />
        <NearestArtsButton />
      </View>
    </Container>
  );
};
export default MapScreen;