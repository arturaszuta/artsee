import React, {useState, useEffect} from 'react';
import { Text,Toast, Input, Button } from "native-base";
import {
  View,
  Dimensions,
  TextInput,
  findNodeHandle,
  KeyboardAvoidingView
} from "react-native";

import CachedImage from '../../helpers/CachedImage';
import artCardStyle from '../../../styles/artCard';
import TextInputState from "react-native/lib/TextInputState";
import { colors } from '../../../styles/variables';
import Icon from "react-native-vector-icons/Ionicons";
import IconMat from 'react-native-vector-icons/MaterialIcons';
import IconMatCom from "react-native-vector-icons/MaterialCommunityIcons";

import Comment from "./Comment";
import moment from "moment";

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const showInfographic = function(text) {
  Toast.show({
    text: text,
    position: 'bottom',
    duration: 500
  })
}

export default ArtCard = ({comp, setTag, postNewComment, user}) => {
  console.log("===========comps away!!!============>", comp)

  let [newComment, setNewComment] = useState('');

  _focusTextInput = node => {
    try {
      TextInputState.focusTextInput(findNodeHandle(node));
    } catch (e) {
      console.log("Couldn't focus text input: ", e.message);
    }
  };

  const imgUrl = 'https://arzmkdmkzm.cloudimg.io/width/' + screenWidth + '/x/' + comp.img_url;

  const bookmark = (comp, setTag) => {
    return (
       <IconMat
        name={comp.seelist ? "bookmark" : "bookmark-border"}
        color={comp.seelist ? colors.seen : colors.color1}
        size={26}
        artID={comp.id}
        userID={comp.user_id}
        onPress={() => setTag(comp.id, "seelist", !comp.seelist)}
        style={artCardStyle.icons}
      />
    )
  } 

  const heart = (comp, setTag) => {
    return (
      <Icon
      name={comp.liked ? "ios-heart" : "ios-heart-empty"}
      color={comp.liked ? colors.like : colors.color1}
      size={26}
      artID={comp.id}
      userID={comp.user_id}
      onPress={() => setTag(comp.id, "liked", !comp.liked)}
      style={artCardStyle.icons}
    />
    )
  } 

  const map = (comp, setTag) => {
    return (
      <Icon
        name={comp.visited ? "ios-map" : "ios-pin"}
        color={comp.visited ? colors.bookmark : colors.color1}
        size={26}
        artID={comp.id}
        userID={comp.user_id}
        onPress={() => setTag(comp.id, "visited", !comp.visited)}
        style={artCardStyle.icons}
      />
    )
  } 

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={500}
      enabled
    >
      <View style={artCardStyle.container}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={artCardStyle.head}>{comp.title || "Art peace!"}</Text>
          <Text style={{ ...artCardStyle.head, fontSize: 22 }}>
            {comp.user_id}
          </Text>
        </View>
        {/* <Image source={{ uri: imgUrl }} style={{ width: screenWidth, height: screenWidth }} /> */}
        <CachedImage
          source={imgUrl}
          title={comp.id}
          style={{ width: screenWidth, height: screenWidth }}
          height={screenWidth}
        />
        {/* <Image style={{ width: screenWidth, height: screenWidth }} {...{preview, imgUrl}} /> */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <View style={artCardStyle.iconContainer}>
            {heart(comp, setTag)}
            {map(comp, setTag)}
            {bookmark(comp, setTag)}
          </View>
          <View>
            <IconMatCom
              name="comment-outline"
              size={26}
              color={colors.color1}
              style={{ marginRight: 10 }}
              onPress={() => _focusTextInput(this._input)}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextInput
            style={{ fontSize: 15, marginLeft: 10 }}
            placeholder="Add a comment"
            ref={c => (this._input = c)}
            value={newComment}
            onChangeText={text => setNewComment(text)}
          />

          <Button onPress={() => {
            postNewComment(comp.id, user.id, newComment);
            setNewComment('');
          }} transparent>
            <Text style={{ color: "grey" }}>Post</Text>
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}