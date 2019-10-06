import React from 'react';
import { Marker } from 'react-native-maps';

import Icon from 'react-native-vector-icons/FontAwesome5';
import mapStyles from '../../../styles/map';
import { colors } from '../../../styles/variables';

const spraycan = <Icon name="spray-can" size={23} color={colors.color1} />;
const child = <Icon name="child" size={28} color={colors.color4} />;

export const marker = (mapMarkers, setRegion, region, navigation) => {
  if (mapMarkers) {           
    return Object.keys(mapMarkers).map(marker => {
      return (
        <Marker draggable
          key = {marker}
          coordinate={mapMarkers[marker]}
          onPress={e => {
            setRegion({...region, ...mapMarkers[marker]})
            navigation.navigate('ArtModal', {artId: mapMarkers[marker].id})
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