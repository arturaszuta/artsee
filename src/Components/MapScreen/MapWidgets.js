import React, { useState } from 'react';
import { Text, View, ImageBackground, Button, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import FadeInView from '../../Animations/FadeInView';

import Icon from 'react-native-vector-icons/FontAwesome5';
import mapStyles from '../../../styles/map';
import { colors } from '../../../styles/variables';

const spraycan = <Icon name="spray-can" size={23} color={colors.color1} />;
const child = <Icon name="child" size={28} color={colors.color4} />;

export const Popup = ({artPopup, setArtPopup, setTag}) => {
  const flag = <Icon name="flag" size={23} color="#fff" onPress={e => {
    setTag(artPopup.artId, 'visited')
  }} />;
  const heart = <Icon name="heart" size={23} color="#fff" onPress={e => {
    setTag(artPopup.artId, 'liked')
  }} />;
  const eye = <Icon name="eye" size={23} color="#fff" onPress={e => {
    setTag(artPopup.artId, 'seelist')
  }} />;
  
  if (artPopup.component) {

    return (
      <FadeInView>
        <ImageBackground style={mapStyles.imgBack} onPress={e => setArtPopup({ component: false })} source={{ uri: artPopup.componentUrl }} imageStyle={mapStyles.imgStyle}>
          <Text style={{...mapStyles.txt, backgroundColor: 'rgba(52, 52, 172, 0.8)'}}>
            Artisteee
          </Text>
          <View style={mapStyles.mapsPopupInfo}>
            <Text style={{...mapStyles.txt, backgroundColor: 'rgba(52, 52, 172, 0.8)'}}>
              {artPopup.componentTitle}
            </Text>
            <Text style={mapStyles.popupIcons}>
              {heart} {flag} {eye}
            </Text>
            <Button onPress={e => setArtPopup({ component: false })} title="X" />
          </View>
        </ImageBackground>
      </FadeInView>
    )
  } else {
    return (
      <View></View>
    )
  }
}

export const marker = (mapMarkers, setArtPopup) => {
  if (mapMarkers) {           
    // console.log("==|==> from inside Map, marker(), mapMarkers: ", state.mapMarkers)
    return Object.keys(mapMarkers).map(marker => {
      return (
        <Marker draggable
          key = {marker}
          coordinate={mapMarkers[marker]}
          onPress={e => {
            setArtPopup({
              component: true,
              componentUrl: mapMarkers[marker].img_url,
              componentTitle: mapMarkers[marker].title || "This piece has no title",
              artId: marker
            })
          }}
        >
          {spraycan}
        </Marker>
      )
    })
  }
}

export const userLocation = (userLocation) => {
  if (userLocation && userLocation.latitude) {

    return (
      <Marker
        key = "user"
        coordinate = {userLocation}
      >
        {child}
      </Marker>
    )
  }
};