import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import useApplicationData from '../../hooks/useApplicationData';

import { Container, Header, Content, Root } from "native-base";
import ArtCard from "./ArtCard";

import Deck from './Deck';
import { FlatList } from 'react-native-gesture-handler';


export default function FeedScreen() {
  const {
    state,
    setTag
  } = useApplicationData();

  let maindata = Object.keys(state.arts).map(artId => state.arts[artId]);

  return (
    <Root>
        <Container>
          <Header />
          <Content>
            <FlatList
              data={maindata}
              renderItem={({item}) => <ArtCard comp={item} setTag={setTag} />}
            />
            {/* <Deck arts={state.arts} setTag={setTag} /> */}
          </Content>
      </Container>
    </Root>
  );
}