import React from 'react';
import { View, Button, Text, Image, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';

import { connect } from 'react-redux';
import { setTag } from '../../actions';

import IconMat from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from '../../../styles/variables';

import modalStyle from '../../../styles/modal' 
import CachedImage from '../../helpers/CachedImage';


const ModalArt = ({navigation, arts, setTag}) => {
  const bookmark = (comp, setTag) => <IconMat name={comp.seelist ? 'bookmark' : 'bookmark-border'} color={comp.seelist ? colors.seen : colors.color1} size={50} artID={comp.id} userID={comp.user_id} onPress={() => setTag(comp.id, 'seelist', !comp.seelist)} style={modalStyle.icons} />;
  const heart = (comp, setTag) => <Icon name={comp.liked ? 'ios-heart' : 'ios-heart-empty'} color={comp.liked ? colors.like : colors.color1} size={50} artID={comp.id} userID={comp.user_id} onPress={() => setTag(comp.id, 'liked', !comp.liked)} style={{...modalStyle.icons}} />;
  const map = (comp, setTag) => <Icon name={comp.visited ? 'ios-map' : 'ios-pin'} color={comp.visited ? colors.bookmark : colors.color1} size={50} artID={comp.id} userID={comp.user_id} onPress={() => setTag(comp.id, 'visited', !comp.visited)} style={modalStyle.icons} />;
  
  const artId = navigation.getParam("artId")
  console.log("==|=> ModalArt, arts:",arts)
  console.log("==|==> ModalArt, artId:",artId)
  let art = arts[artId];

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

const mapStateToProps = state => ({
  arts: state.arts
})

const mapDispatchToProps = dispatch => ({
  setTag: (id, opt, value) => dispatch(setTag(id, opt, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ModalArt));
