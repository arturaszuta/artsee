import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import useApplicationData from '../../hooks/useApplicationData';

import { Container, Header, Content, Root } from "native-base";

import Deck from './Deck';


export default function FeedScreen() {
  
  const {
    state,
    setTag
  } = useApplicationData();

   const stateArray = Object.keys(state.arts).map((el) => state.arts[el]);
   const renderedCards = stateArray.slice(0,20);


   

  return (
    <Root>
        <Container>
          <Header />
          <Content>
            <Deck arts={renderedCards} setTag={setTag} />
          </Content>
      </Container>
    </Root>
  );
}