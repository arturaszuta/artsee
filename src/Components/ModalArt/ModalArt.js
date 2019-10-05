import React from 'react';
import { View, Button, Text, Image, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import modalStyle from '../../../styles/modal' 
import CachedImage from '../../helpers/CachedImage';
 
const ModalArt = ({navigation}) => {
  const art = navigation.getParam("art")
  const setTag = navigation.getParam("setTag")

  const imgUrl = 'https://arzmkdmkzm.cloudimg.io/width/' + Math.round(Dimensions.get('window').width) + '/x/' + art.img_url;
  
  return (
    <View style={modalStyle.container}>
      <Text style={modalStyle.txt}>Art peace!</Text>
      <CachedImage
        source={imgUrl}
        title={art.id}
        style={modalStyle.image}
      />
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