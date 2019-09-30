import React, { useEffect, useState } from "react";
import { Container, Content, Text, Button, Header, Left, Right, Body, DeckSwiper } from 'native-base';
import axios from 'axios';

const FeedScreen = ({navigation}) => {
  let [photos, setPhotos] = useState([]);

   useEffect(() => {
    axios
      .all([
        axios.get('https://source.unsplash.com/random/400x350'),
        axios.get('https://source.unsplash.com/random/400x350'),
        axios.get('https://source.unsplash.com/random/400x350'),
        axios.get('https://source.unsplash.com/random/400x350'),
        axios.get('https://source.unsplash.com/random/400x350')
      ])
      .then(data => {
        console.log(data[0]);
      })
      .catch(err => console.error(err));
   }, [])

   return (
    <Container>
      <Header style={{backgroundColor:'#f46036'}}>
        <Left style={{flex:1}}/>
        <Body style={{flex:1, alignItems:'center', justifyContent: "center"}}>
          <Text style={{color:'#fdfffc', fontWeight:'bold', fontSize:20}}>My Feed</Text>
        </Body>
        <Right style={{flex:1}}/>
      </Header>
      <Content
        contentContainerStyle={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
      </Content>
    </Container>
  );
};

export default FeedScreen;