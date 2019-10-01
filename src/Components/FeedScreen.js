import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Dimensions,
  View
} from 'react-native';


import { Container, Header, Content, Card, CardItem, Text, Button, Icon, Left, Body } from "native-base";

export default function FeedScreen() {

  const [cards, setCards] = useState([]);

  let components = [];

  const screenHeight = Math.round(Dimensions.get('window').height);
  const screenWidth = Math.round(Dimensions.get('window').width);

    const getResults = function() {
      fetch('https://artsee-back-end.herokuapp.com/arts'
        ).then((response) => response.json()).then(res =>{
        components = res.map((comp)=> 
          <Card style={{flex: 0}}>
          <CardItem>
            <Left>
              <Body>
                <Text>{comp.title}</Text>
                <Text note>April 15, 2016</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Body>
              <Image source={{uri: comp.img_url}} style={{height: screenWidth, width: screenWidth * 0.9, flex: 1}}/>
            </Body>
          </CardItem>
          <View style={{
            borderTopColor: 'black',
            borderTopWidth: 1
          }}>

          </View>
          <CardItem>
            <Left>
              <Button transparent textStyle={{color: '#87838B'}}>
                <Icon name="logo-github" />
                <Text>1,926 stars</Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
    )
    setCards(components)

      } 
      )
    }

    useEffect(() => {
      getResults();
    }, [])

  return (
    <Container>
    <Header />
    <Content>
      {cards}
    </Content>
  </Container>
  );
}

takePicture = async() => {
  if (this.camera) {
    const options = { quality: 0.5, base64: true };
    const data = await this.camera.takePictureAsync(options);
    console.log(data.uri);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
