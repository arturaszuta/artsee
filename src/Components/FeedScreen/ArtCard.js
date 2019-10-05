import React, { useState } from 'react';
import { Card, CardItem, Text, Button, Left, Body, Right, Toast } from "native-base";
import { View, Dimensions, Image } from 'react-native';
import { CLOUDIMG_TOKEN } from 'react-native-dotenv'

import Img from 'react-cloudimage-responsive';


import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Axios from 'axios';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const showInfographic = function(text) {
  Toast.show({
    text: text,
    position: 'bottom',
    duration: 500
  })
}

export default ArtCard = ({comp, setTag}) => {
  const imgUrl = 'https://' + CLOUDIMG_TOKEN + '.cloudimg.io/width/' + screenWidth + '/x/' + comp.img_url;
  return (
    <View>
      <Text style={modalStyle.txt}>Art peace!</Text>
      <Image source={{ uri: imgUrl }} style={modalStyle.image} />
      <View style={modalStyle.icons}>
          <Icon name={comp.seelist ? 'eye-check-outline' : 'eye-plus-outline' } artID={comp.id} userID={comp.user_id} size={55} onPress={() => setTag(comp.id, 'seelist')}  />
          <Icon name={comp.liked ? 'heart-circle' : 'heart-circle-outline'} size={55} artID={comp.id} userID={comp.user_id} size={55} onPress={() => setTag(comp.id, 'liked')}/>
          <Icon name={comp.visited ? 'check-circle' : 'check-circle-outline'} size={55} artID={comp.id} userID={comp.user_id} size={55} onPress={() => setTag(comp.id, 'visited')}/>
      </View>
    </View>
  )
}
