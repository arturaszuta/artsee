import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { useApplicationData, fullState } from '../../hooks/useApplicationData';
import Constants from 'expo-constants';

import { Container, Header, Content, Root } from "native-base";

import Deck from './Deck';


export default function FeedScreen() {
  const {
    state,
    setTag
  } = useApplicationData();

  console.log("==|||==> FeedScreen")

  // let arts = fullState.arts
  const arts = state.arts

  return (
    <Root>
      <Container style={{ marginTop: Constants.statusBarHeight }}>
        <Content>
          <Deck arts={arts} setTag={setTag} />
        </Content>
      </Container>
    </Root>
  );
}