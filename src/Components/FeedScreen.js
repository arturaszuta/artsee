import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Dimensions,
  View,
  AsyncStorage
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";




import { Container, Header, Content, Card, CardItem, Text, Button, Left, Body, Right, Spinner, Toast, Root, Item } from "native-base";

export default function FeedScreen() {

  const [cards, setCards] = useState([]);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [artSocialStatus, setArtSocialStatus] = useState([]);
  const [arts, setArts] = useState({});
  const [artsIDs, setArtsIDs] = useState([]);

  const screenHeight = Math.round(Dimensions.get('window').height);
  const screenWidth = Math.round(Dimensions.get('window').width);

  const showInfographic = function(text) {
    Toast.show({
      text: text,
      position: 'bottom',
      duration: 500
    })
  }

  const changeTagStatus = function(item,type) {
    let tempstate = arts[item]
    tempstate[type] = !tempstate[type]

    let fullState = arts;
    fullState[item] = tempstate;

    setArts({
      ...fullState
    })

    const queryString = 'https://artsee-back-end.herokuapp.com/tags' + '?user_id=' + userId + '&art_id=' + item + '&type=' + type + '&value=' + tempstate[type]

    fetch(queryString, {
      method: 'POST',

    }).then((response) => response.json()).then(res => {console.log(res)})


   
  }

  const getTags = async function() {

    const usID = await AsyncStorage.getItem('userId');
    setUserId(usID);
    console.log(usID);
   

    fetch('https://artsee-back-end.herokuapp.com/api/userArts?user_id=' + usID
        ).then((response) => response.json()).then(res =>{
          
          let tempState = {};
          let tempIDState = [];
          
           res.forEach((comp)=>{
            tempState[comp.id] = comp 
            tempIDState.push(comp.id)
          })

          setArts(tempState);
          setArtsIDs(tempIDState);


        })
  }

  const deck = () => {
    if (arts && artsIDs) {
    
      return artsIDs.map(art => {

        const comp = arts[art]
        

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
              <Image source={{uri: comp.img_url}} style={{height: screenWidth, width: screenWidth * 0.9, flex: 1}}/>
            </Body>
          </CardItem>
          <View style={{
            borderTopColor: 'grey',
            borderTopWidth: StyleSheet.hairlineWidth
          }}>

          </View>
          <CardItem>
            <Right style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <Button transparent textStyle={{color: '#87838B'}} onPress={() => {
                showInfographic('Marked as visited!')
                
              }}>
                <Icon name={comp.seelist ? 'eye-check-outline' : 'eye-plus-outline' } artID={comp.id} userID={comp.user_id} ref={ (c) => { this._icon = c}} size={55} onPress={() => { 
                
                  changeTagStatus(comp.id, 'seelist')}}  />
              </Button>
              <Button transparent textStyle={{color: '#87838B'}} onPress={() => {
                showInfographic('Liked it!')
              }}>
                <Icon name={comp.liked ? 'heart-circle' : 'heart-circle-outline'} size={55} artID={comp.id} userID={comp.user_id} ref={ (c) => { this._icon = c}} size={55} onPress={() => { 
                
                changeTagStatus(comp.id, 'liked')}}/>
              </Button>
              <Button transparent textStyle={{color: '#87838B'}} onPress={() => {
                showInfographic('Marked as visited!')
                
              }}>
                <Icon name={comp.visited ? 'check-circle' : 'check-circle-outline'} size={55} artID={comp.id} userID={comp.user_id} ref={ (c) => { this._icon = c}} size={55} onPress={() => { 
                
                changeTagStatus(comp.id, 'visited')}}/>
              </Button>
            </Right>
          </CardItem>
        </Card>
            )})
      
      
    }
    return null
  }
    useEffect(() => {
      getTags();

    }, [])

  return (
    <Root>
    <Container>
    <Header />
    <Content>
      {artsIDs.length === 0 && <Spinner color='blue' size={75} style={{ marginTop: (screenHeight / 2) - 75}} />}
      {cards}
      {deck()}
    </Content>
  </Container>
  </Root>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icon: {
    marginRight: 15
  }
});
