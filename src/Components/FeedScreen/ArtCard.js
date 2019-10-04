import React from 'react';
import { Card, CardItem, Text, Button, Left, Body, Right, Toast } from "native-base";
import { View, Dimensions, Image } from 'react-native';



import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const showInfographic = function(text) {
  Toast.show({
    text: text,
    position: 'bottom',
    duration: 500
  })
}


export default ArtCard = ({comp, setTag}) => {
  
  return (
    <Card style={{flex: 0}} key={comp.id}>
      <CardItem>
        <Left>
          <Body>
            <Text>{comp.title} posted by USER: id:{comp.id}</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem>
        <Body>
          <Image source={{uri: comp.img_url}}  style={{height: screenWidth, width: screenWidth * 0.9, flex: 1}}/>
        </Body>
      </CardItem>
      <View style={{
        borderTopColor: 'grey',
        // borderTopWidth: StyleSheet.hairlineWidth
      }}>

      </View>
      <CardItem>
        <Right style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Button transparent textStyle={{color: '#87838B'}} onPress={() => showInfographic('Marked as visited!')}>
            <Icon name={comp.seelist ? 'eye-check-outline' : 'eye-plus-outline' } artID={comp.id} userID={comp.user_id} ref={ (c) => { this._icon = c}} size={55} onPress={() => setTag(comp.id, 'seelist')}  />
          </Button>
          <Button transparent textStyle={{color: '#87838B'}} onPress={() => showInfographic('Liked it!')}>
            <Icon name={comp.liked ? 'heart-circle' : 'heart-circle-outline'} size={55} artID={comp.id} userID={comp.user_id} ref={ (c) => { this._icon = c}} size={55} onPress={() => setTag(comp.id, 'liked')}/>
          </Button>
          <Button transparent textStyle={{color: '#87838B'}} onPress={() => showInfographic('Marked as visited!')}>
            <Icon name={comp.visited ? 'check-circle' : 'check-circle-outline'} size={55} artID={comp.id} userID={comp.user_id} ref={ (c) => { this._icon = c}} size={55} onPress={() => setTag(comp.id, 'visited')}/>
          </Button>
        </Right>
      </CardItem>
    </Card>
  )
}