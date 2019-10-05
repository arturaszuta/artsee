import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import useApplicationData from '../../hooks/useApplicationData';
import { CloudimageProvider } from 'react-cloudimage-responsive';
import { CLOUDIMG_TOKEN } from 'react-native-dotenv'

import { Container, Header, Content, Root } from "native-base";
import ArtCard from "./ArtCard";

import Deck from './Deck';


export default function FeedScreen() {
  const {
    state,
    setTag
  } = useApplicationData();

  const cloudimageConfig = {
    token: CLOUDIMG_TOKEN,
    baseUrl: ''
  };

  return (
    <Root>
        <Container>
          <Header />
          <CloudimageProvider>
            <Deck arts={state.arts} setTag={setTag} />
          </CloudimageProvider>
      </Container>
    </Root>
  );
}