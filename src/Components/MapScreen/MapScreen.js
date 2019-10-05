import React, { useState, useEffect } from 'react';
import { Text, View, Dimensions, AsyncStorage } from 'react-native';
import { Container, Header, Left, Body, Right } from 'native-base';
import MapView from 'react-native-maps';

import { useApplicationData, fullState } from '../../hooks/useApplicationData';

import { colors } from '../../../styles/variables';

import CenterOnMe from './CenterOnMe';
import { NearestArtButton, NearestArtsButton, NearestArtDirections, Duration } from './Nearest';
import { marker, userLocation } from './MapWidgets';

const MapScreen = ({navigation,state,getUserLocation,getNearestArts,getNearestArt,setTag}) => {
  // const {
  //   state,
  //   getUserLocation,
  //   getNearestArts,
  //   getNearestArt,
  //   setTag
  // } = useApplicationData();


  const [duration, setDuration] = useState(null);
  const [mapview, setMapview] = useState(null);
  const [directionOn, setDirectionState] = useState(false)
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
      mapview.animateToRegion(region, 50)
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
          onUserLocationChange={event => getUserLocation()}
          ref={c => setMapview(c)}
        >
          {marker(state.arts, setRegion, region, navigation)}
          {userLocation(state.userLocation)}
          <NearestArtDirections userLocation={state.userLocation} destination={state.destination} setDuration={setDuration} setRegion={setRegion} directionOn={directionOn} />
        </MapView>
        <NearestArtButton getNearestArt={getNearestArt} setDirectionState={setDirectionState} />
        <NearestArtsButton getNearestArts={getNearestArts} />
        <Duration duration={duration} setDuration={setDuration} setDirectionState={setDirectionState} setRegion={setRegion} />
        <CenterOnMe setRegion={setRegion} coordinates={{
          latitude: state.userLocation.latitude,
          longitude: state.userLocation.longitude
        }} />
      </View>
    </Container>
  );
};

export default MapScreen;