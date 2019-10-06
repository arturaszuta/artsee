import React from 'react';
import { View, Button, Text, Image, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';

import IconMat from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from '../../../styles/variables';

import modalStyle from '../../../styles/modal' 
import CachedImage from '../../helpers/CachedImage';

const bookmark = (comp, setTag) => <IconMat name={comp.seelist ? 'bookmark' : 'bookmark-border'} color={comp.seelist ? colors.seen : colors.color1} size={50} artID={comp.id} userID={comp.user_id} onPress={() => setTag(comp.id, 'visited')} style={modalStyle.icons} />;
const heart = (comp, setTag) => <Icon name={comp.liked ? 'ios-heart' : 'ios-heart-empty'} color={comp.liked ? colors.like : colors.color1} size={50} artID={comp.id} userID={comp.user_id} onPress={() => setTag(comp.id, 'liked')} style={{...modalStyle.icons}} />;
const map = (comp, setTag) => <Icon name={comp.visited ? 'ios-map' : 'ios-pin'} color={comp.visited ? colors.bookmark : colors.color1} size={50} artID={comp.id} userID={comp.user_id} onPress={() => setTag(comp.id, 'seelist')} style={modalStyle.icons} />;
 
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
        {heart(art, setTag)}
        {map(art, setTag)}
        {bookmark(art, setTag)}
      </View>
      <Text style={{ color: colors.color2, fontSize: 24, textAlign: 'center', flex: 1, justifyContent: 'center' }}>comments...</Text>
      <View onPress={() => navigation.goBack()} >
        <Text style={modalStyle.dismiss}>
          X
        </Text>
      </View>
    </View>
  )
}

export default withNavigation(ModalArt)
