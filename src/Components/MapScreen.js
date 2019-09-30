import React, { Component, useState } from 'react';
import { Animated, Platform, StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import { Container, Header, Left, Body, Right, Content } from 'native-base';
import MapView, { Marker } from 'react-native-maps';

import useApplicationData from '../hooks/useApplicationData';

import mapStyles from '../../styles/map';
import Icon from 'react-native-vector-icons/FontAwesome5';

const flag = <Icon name="flag" size={23} color="#fff" />;
const heart = <Icon name="heart" size={23} color="#fff" />;
const eye = <Icon name="eye" size={23} color="#fff" />;

const MapScreen = ({navigation}) => {
  const {
    state,
    getUserLocation,
    getNearestArts
  } = useApplicationData();

  navigationOptions = {
    title: 'Map'
  };

  const NearestArt = () => {
    return (
      <Icon name="map-marked" size={30} color="#fff" onPress={e => getNearestArts()} style={mapStyles.nearButton} title="nearby" >
      </Icon>
    )
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
          />
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
          >
            {marker()}
          </MapView>
            <NearestArt />
      </View>
    </Container>
  );
};
export default MapScreen;