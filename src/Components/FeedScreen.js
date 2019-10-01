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


import { Container, Header, Content, Card, CardItem, Text, Button, Left, Body, Right, Spinner, Toast, Root } from "native-base";

export default function FeedScreen() {

  const [cards, setCards] = useState([]);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  let components = [];

  const screenHeight = Math.round(Dimensions.get('window').height);
  const screenWidth = Math.round(Dimensions.get('window').width);

  _fetchDeviceStorage = async () => {
    try {
      const fetchedToken = await AsyncStorage.getItem('token');
      setToken(fetchedToken);
      const userId = await AsyncStorage.getItem('userId');
      setUserId(userId);
    } catch(err) {
      console.error(err);
    }
  };

  const showInfographic = function(text) {
    Toast.show({
      text: text,
      position: 'bottom',
      duration: 500
    })
  }

  const getTags = async function(initArray) {

    const usID = await AsyncStorage.getItem('userId');
    console.log(usID)
    

    let queryStr = '';
    let newArr = [];


    initArray.forEach((el) => {
      queryStr += 'art_array[]=' + el.id + '&'
    })
    console.log(queryStr);

    fetch('https://artsee-back-end.herokuapp.com/tags?user_id=' + usID + '&' + queryStr
        ).then((response) => response.json()).then(res =>{
          console.log(res)
          console.log(initArray)
          components = initArray.map((comp)=>{
          let artStatus = {};
          res.forEach((el) => {
            if(el.art_id === comp.id) {
              artStatus = el;
            }
          })
          return <Card style={{flex: 0}} key={comp.id}>
          <CardItem>
            <Left>
              <Body>
                <Text>{comp.title} posted by USER</Text>
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
                showInfographic('Added to Seelist!')
              }}>
                <Icon name={artStatus.seelist ? 'eye-check-outline' : 'eye-plus-outline' } size={55} />
              </Button>
              <Button transparent textStyle={{color: '#87838B'}} onPress={() => {
                showInfographic('Liked it!')
              }}>
                <Icon name={artStatus.liked ? 'heart-circle' : 'heart-circle-outline'} size={55} />
              </Button>
              <Button transparent textStyle={{color: '#87838B'}} onPress={() => {
                showInfographic('Marked as visited!')
              }}>
                <Icon name={artStatus.visited ? 'check-circle' : 'check-circle-outline'} size={55} />
              </Button>
            </Right>
          </CardItem>
        </Card>}
    )
    setCards(components)

        })
  }

    const getResults = function() {
      fetch('https://artsee-back-end.herokuapp.com/arts'
        ).then((response) => response.json()).then(res =>{
          getTags(res);
      } 
      )
    }

    useEffect(() => {
      _fetchDeviceStorage();
      getResults();
    }, [])

  return (
    <Root>
    <Container>
    <Header />
    <Content>
      {cards.length === 0 && <Spinner color='blue' size={75} style={{ marginTop: (screenHeight / 2) - 75}} />}
      {cards}
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
