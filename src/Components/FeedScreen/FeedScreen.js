import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { useApplicationData, fullState } from '../../hooks/useApplicationData';

import { Container, Header, Content, Root } from "native-base";

import Deck from './Deck';


export default function FeedScreen() {
  const {
    setTag
  } = useApplicationData();

  const arts = fullState.arts

  return (
    <Root>
        <Container>
          <Header />
          <Content>
            <Deck arts={arts} setTag={setTag} />
          </Content>
      </Container>
    </Root>
  );
}