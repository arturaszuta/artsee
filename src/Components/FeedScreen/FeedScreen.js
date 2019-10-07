import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import Constants from 'expo-constants';

import { Container, Content } from "native-base";

import Deck from './Deck';

export default FeedScreen = ({navigation, arts, setTag, users}) => {

  console.log("==|==|> FeedScreen. users:",users)
  return (
      <Container style={{ marginTop: Constants.statusBarHeight }}>
        <Content>
          <Deck arts={arts} setTag={setTag} />
        </Content>
      </Container>
  );
}