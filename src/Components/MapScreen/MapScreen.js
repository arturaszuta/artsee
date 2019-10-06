import React, { useState, useEffect } from 'react';
import { Text, View, Dimensions, AsyncStorage } from 'react-native';
import { Container, Header, Left, Body, Right } from 'native-base';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import Constants from 'expo-constants';

// import { useApplicationData } from '../../hooks/useApplicationData';

import {
  fetchUser,
  fetchToken
} from '../../actions'

import { colors } from '../../../styles/variables';

import CenterOnMe from './CenterOnMe';
import { NearestArtButton, NearestArtsButton, NearestArtDirections, Duration } from './Nearest';
import { marker, userLocation } from './MapWidgets';

const MapScreen = ({navigation, reduxState}) => {
  // const {
  //   state,
  //   getUserLocation,
  //   getNearestArts,
  //   getNearestArt,
  //   setTag,
  // } = useApplicationData();

  console.log("==|==> from mapscreen. reduxState:",reduxState)

  const [duration, setDuration] = useState(null);
  const [mapview, setMapview] = useState(null);
  const [directionOn, setDirectionState] = useState(false)
  const [region, setRegion] = useState({
    latitude: 43.644913,
    longitude: -79.402520,
    latitudeDelta: 0.0522,
    longitudeDelta: 0.0121,
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
    <Container style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
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
          // onUserLocationChange={event => getUserLocation()}
          // ref={c => setMapview(c)}
        >
          {marker(reduxState.arts, setRegion, region, navigation)}
          {/* {userLocation(state.userLocation)} */}
          {/* <NearestArtDirections userLocation={state.userLocation} destination={state.destination} setDuration={setDuration} setRegion={setRegion} directionOn={directionOn} /> */}
        </MapView>
        {/* <NearestArtButton getNearestArt={getNearestArt} setDirectionState={setDirectionState} />
        <NearestArtsButton getNearestArts={getNearestArts} />
        <Duration duration={duration} setDuration={setDuration} setDirectionState={setDirectionState} setRegion={setRegion} />
        <CenterOnMe setRegion={setRegion} coordinates={{
          latitude: state.userLocation.latitude,
          longitude: state.userLocation.longitude
        }} /> */}
      </View>
    </Container>
  );
};

function mapStateToProps(state) {
  const reduxState = state

  return {
    reduxState
  }
}

export default connect(mapStateToProps)(MapScreen);