import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import useApplicationData from '../../hooks/useApplicationData';

import { Container, Header, Content, Root } from "native-base";

import Deck from './Deck';


export default function FeedScreen() {
  const {
    state,
    setTag
  } = useApplicationData();

  return (
    <Root>
        <Container>
          <Header />
          <Content>
            <Deck arts={state.arts} setTag={setTag} />
          </Content>
      </Container>
    </Root>
  );
}