import React from 'react';
import { Text,Toast } from "native-base";
import { View, Dimensions } from 'react-native';

import CachedImage from '../../helpers/CachedImage';
import artCardStyle from '../../../styles/artCard'
import { colors } from '../../../styles/variables';
import Icon from "react-native-vector-icons/Ionicons";
import IconMat from 'react-native-vector-icons/MaterialIcons';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const showInfographic = function(text) {
  Toast.show({
    text: text,
    position: 'bottom',
    duration: 500
  })
}

export default ArtCard = ({comp, setTag, ogUser}) => {
  const imgUrl = 'https://arzmkdmkzm.cloudimg.io/width/' + screenWidth + '/x/' + comp.img_url;

  const bookmark = (comp, setTag) => <IconMat name={comp.seelist ? 'bookmark' : 'bookmark-border'} color={comp.seelist ? colors.seen : colors.color1} size={26} artID={comp.id} userID={comp.user_id} onPress={() => setTag(comp.id, 'seelist', !comp.seelist)} style={artCardStyle.icons} />;
  const heart = (comp, setTag) => <Icon name={comp.liked ? 'ios-heart' : 'ios-heart-empty'} color={comp.liked ? colors.like : colors.color1} size={26} artID={comp.id} userID={comp.user_id} onPress={() => setTag(comp.id, 'liked', !comp.liked)} style={artCardStyle.icons} />;
  const map = (comp, setTag) => <Icon name={comp.visited ? 'ios-map' : 'ios-pin'} color={comp.visited ? colors.bookmark : colors.color1} size={26} artID={comp.id} userID={comp.user_id} onPress={() => setTag(comp.id, 'visited', !comp.visited)} style={artCardStyle.icons} />;

  return (
    <View style={artCardStyle.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
        <Text style={artCardStyle.head}>{ogUser.name || 'Art peace!'}</Text>
        {ogUser.avatar && <CachedImage style={{...artCardStyle.headImage, width: 35, height: 35, resizeMode: 'cover'}} 
          source={ogUser.avatar}
          title={ogUser.email}
          height={35}
        />}
      </View>
      {/* <Image source={{ uri: imgUrl }} style={{ width: screenWidth, height: screenWidth }} /> */}
      <CachedImage
        source={imgUrl}
        title={comp.id}
        style={{ width: screenWidth, height: screenWidth }}
        height={screenWidth}
      />
      <Text style={artCardStyle.title}>{comp.title || 'Art peace!'}</Text>
      <View style={artCardStyle.iconContainer}>
          {heart(comp, setTag)}
          {map(comp, setTag)}
          {bookmark(comp, setTag)}
      </View>
      <Text style={artCardStyle.comment}>comments...</Text>
      {/* <View style={{ flex: 1, width: screenWidth, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={artCardStyle.line}>____________________________________</Text>
      </View> */}
    </View>
  )
}