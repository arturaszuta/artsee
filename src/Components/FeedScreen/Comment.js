import React from 'react';
import {View, Text} from 'react-native';
import moment from "moment";


export default function Comment({comment, username}) {
  const date = moment().utc(comment.created_at).local().startOf('day').fromNow()
  return (
    <View key={comment.id}>
      <View style={{flexDirection:"row"}}>
        <Text style={{fontWeight:"bold", marginRight:10, marginLeft:10}}>{username}</Text>
        <Text>{comment.content}</Text>
      </View>

      <Text style={{marginLeft:10}}>
        {date}
      </Text>
    </View>
  );
}