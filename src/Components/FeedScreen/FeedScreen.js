import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { useApplicationData } from '../../hooks/useApplicationData';

import { Container, Header, Content, Root } from "native-base";
import ArtCard from "./ArtCard";

import Deck from './Deck';


export default function FeedScreen() {
  const {
    state,
    setTag
  } = useApplicationData();

  const arts = state.arts

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