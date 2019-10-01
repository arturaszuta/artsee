import React from 'react';
import { Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import mapStyles from '../../../styles/map';
import { colors } from '../../../styles/variables';

const { width, height } = Dimensions.get('window');

const centerOnMe = (coordinates, setRegion) => {
  setRegion({...coordinates, longitudeDelta: 0.0125, latitudeDelta: 0.0125});
}

export default CenterOnMe = ({coordinates, setRegion}) => {
  return (
    <Icon name="bullseye" size={30} color={colors.color3} onPress={e => centerOnMe(coordinates, setRegion)} style={{...mapStyles.nearButton, bottom: 130 }} title="onMe" />
  )
}