import React from 'react';
import {View, Text} from 'react-native';
import moment from "moment";


export default function Comment({comment, username}) {
  const converted_date = moment(comment.created_at).format(
    "YYYY-MM-DD HH:mm:ss"
  );
  const posted_at = moment(converted_date).fromNow();
 
  return (
    <View key={comment.id}>
      <View style={{flexDirection:"row"}}>
        <Text style={{fontWeight:"bold", marginRight:10, marginLeft:10}}>{username}</Text>
        <Text>{comment.content}</Text>
      </View>

      <Text style={{marginLeft:10}}>
        {posted_at}
      </Text>
    </View>
  );
}