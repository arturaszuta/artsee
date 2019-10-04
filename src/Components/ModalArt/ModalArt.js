import React from 'react';
import { View, Button, Text, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { fullState } from '../../hooks/useApplicationData';

import modalStyle from '../../../styles/modal' 
 
const ModalArt = ({navigation}) => {
  const state = fullState
  console.log("==|==> inside ModalArt. state:",state)
  const art = navigation.getParam("art")
  const setTag = navigation.getParam("setTag")
  
  return (
    <View style={modalStyle.container}>
      <Text style={modalStyle.txt}>Art peace!</Text>
      <Image source={{ uri: art.img_url }} style={modalStyle.image} />
      <View style={modalStyle.icons}>
          <Icon name={art.seelist ? 'eye-check-outline' : 'eye-plus-outline' } artID={art.id} userID={art.user_id} size={55} onPress={() => setTag(art.id, 'seelist')}  />
          <Icon name={art.liked ? 'heart-circle' : 'heart-circle-outline'} size={55} artID={art.id} userID={art.user_id} size={55} onPress={() => setTag(art.id, 'liked')}/>
          <Icon name={art.visited ? 'check-circle' : 'check-circle-outline'} size={55} artID={art.id} userID={art.user_id} size={55} onPress={() => setTag(art.id, 'visited')}/>
      </View>
      <Button
        onPress={() => navigation.goBack()}
        style={modalStyle.dismiss}
        title="Dismiss"
      />
    </View>
  )
}

export default withNavigation(ModalArt)