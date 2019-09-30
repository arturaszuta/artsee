import React, { Component, useState } from 'react';
import { Animated, Platform, StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import { Container, Header, Left, Body, Right, Content } from 'native-base';
import MapView, { Marker } from 'react-native-maps';

import mapStyles from '../../styles/map';

const MapScreen = ({navigation}) => {
  navigationOptions = {
    title: 'Map'
  };

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
            {/* {marker()} */}
          </MapView>
      </View>
    </Container>
  );
};
export default MapScreen;