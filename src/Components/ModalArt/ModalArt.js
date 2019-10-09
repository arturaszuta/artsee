import React from 'react';
import { View, Button, Text, Image, Dimensions, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';

import { connect } from 'react-redux';
import { postTag } from '../../actions';

import IconMat from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from '../../../styles/variables';

import modalStyle from '../../../styles/modal' 
import CachedImage from '../../helpers/CachedImage';
import Comment from '../../Components/FeedScreen/Comment';
// import { ScrollView } from 'react-native-gesture-handler';


const ModalArt = ({navigation, arts, postTag, users, user}) => {
  const bookmark = (comp, postTag) => <IconMat 
    name={comp.seelist ? 'bookmark' : 'bookmark-border'} 
    color={comp.seelist ? colors.seen : colors.color1} 
    size={30} 
    artID={comp.id} 
    userID={comp.user_id} 
    onPress={() => postTag(comp.id, 'seelist', !comp.seelist, user.id)} style={modalStyle.icons} 
  />;
  const heart = (comp, postTag) => <Icon 
    name={comp.liked ? 'ios-heart' : 'ios-heart-empty'} 
    color={comp.liked ? colors.like : colors.color1} 
    size={30} 
    artID={comp.id} 
    userID={comp.user_id} 
    onPress={() => postTag(comp.id, 'liked', !comp.liked, user.id)} 
    style={{...modalStyle.icons}} 
  />;
  const map = (comp, postTag) => <Icon 
    name={comp.visited ? 'ios-map' : 'ios-pin'} 
    color={comp.visited ? colors.bookmark : colors.color1} 
    size={30} 
    artID={comp.id} 
    userID={comp.user_id} 
    onPress={() => postTag(comp.id, 'visited', !comp.visited, user.id)} 
    style={modalStyle.icons} 
  />;
  
  const artId = navigation.getParam("artId")
  let art = arts[artId];

  const imgUrl = 'https://arzmkdmkzm.cloudimg.io/width/' + Math.round(Dimensions.get('window').width) + '/x/' + art.img_url;

  const renderComments = () => {
    if (art.comments.length > 0) {
      return art.comments.map((comment, idx) => {
        return (
          <Comment key={idx} comment={comment} username={users[comment.user_id].name} />
        )
      })
    } else {
      return <Text style={{ fontSize: 24 }}>no comments...</Text>
    }
  }
  
  return (
    <View style={modalStyle.container}>
      <Text style={modalStyle.txt}>{art.title}</Text>
      <CachedImage
        source={imgUrl}
        title={art.id}
        style={modalStyle.image}
      />
      <View style={{ flex: 1, flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 5 }} >
          {renderComments()}
        </ScrollView>
        <View style={modalStyle.icons}>
          {heart(art, postTag)}
          {map(art, postTag)}
          {bookmark(art, postTag)}
        </View>
      </View>
      <Icon name="md-arrow-round-back" onPress={e => {
        navigation.goBack();
      }} size={40} color="red" title="endDirections" style={{ paddingBottom: 10 }} />
    </View>
  )
}

const mapStateToProps = state => ({
  arts: state.arts,
  users: state.users,
  user: state.users.user
})

const mapDispatchToProps = dispatch => ({
  postTag: (id, opt, value, ) => dispatch(postTag(id, opt, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ModalArt));
