import React, { useState, useEffect } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { Container, Header, Left, Body, Right, Content } from 'native-base';
import MapView, { Marker } from 'react-native-maps';

import useApplicationData from '../../hooks/useApplicationData';

import mapStyles from '../../../styles/map';
import { colors } from '../../../styles/variables';

import CenterOnMe from './CenterOnMe';
import { NearestArtButton, NearestArtsButton, nearestArtDirections, Duration } from './Nearest';
import { marker, Popup, userLocation } from './MapWidgets';

const { width, height } = Dimensions.get('window');

const MapScreen = ({navigation}) => {
  const {
    state,
    getUserLocation,
    getNearestArts,
    getNearestArt
  } = useApplicationData();

  const [duration, setDuration] = useState(null);
  const [mapview, setMapview] = useState(null);
  const [artPopup, setArtPopup] = useState({
    component: null,
    componentTitle: null,
    componentUrl: null
  });
  const [region, setRegion] = useState({
    latitude: 43.644913,
    longitude: -79.402520,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  navigationOptions = {
    title: 'Map'
  };

  useEffect(() => {
    if (mapview) {
      mapview.animateToRegion(region, 100)
    }
  }, [region])

  return (
    <Container style={{ flex: 1 }}>
       <Header style={{backgroundColor:colors.color2}}>
        <Left style={{flex:1}}><Text style={{color:colors.text, fontWeight:'bold', fontSize:18}}>artsee</Text></Left>
        <Body style={{flex:1, alignItems:'center', justifyContent: "center"}}>
        </Body>
        <Right style={{flex:1}}/>
      </Header>
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={region}
          ref={c => setMapview(c)}
        >
          {marker(state.mapMarkers, setArtPopup)}
          {userLocation(state.userLocation)}
          {nearestArtDirections(state.userLocation, state.destination, setDuration, setRegion)}
        </MapView>
        <NearestArtButton getNearestArt={getNearestArt} />
        <NearestArtsButton getNearestArts={getNearestArts} />
        <Duration duration={duration} />
        <CenterOnMe setRegion={setRegion} coordinates={{
          latitude: state.userLocation.latitude,
          longitude: state.userLocation.longitude
        }} />
        <Popup artPopup={artPopup} setArtPopup={setArtPopup} />
      </View>
    </Container>
  );
};

export default MapScreen;