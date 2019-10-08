import React from 'react';
import {View, Text} from 'react-native';
import moment from "moment";


export default function Comment({comment}) {
  return (
    <View key={comment.id}>
      <View style={{flexDirection:"row"}}>
        <Text style={{fontWeight:"bold", marginRight:10, marginLeft:10}}>{comment.user_id}</Text>
        <Text>{comment.content}</Text>
      </View>

      <Text style={{marginLeft:10}}>
        {moment(comment.created_at)
          .startOf("day")
          .fromNow()}
      </Text>
    </View>
  );
}