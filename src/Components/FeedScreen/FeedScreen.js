import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import useApplicationData from '../../hooks/useApplicationData';

import { Container, Header, Content, Root, Left, Body, Button, Icon, Segment, Text } from "native-base";

import Deck from './Deck';



export default function FeedScreen() {
  const {
    state,
    setTag
  } = useApplicationData();

  const [activeFilter, setActiveFilter] = useState('default');

  const changeFeed = async function(param) {
    setActiveFilter(param)
    
  }





  return (
    <Root>
        <Container>
          <Header style={{ marginTop: 20 }}>
          <Container>
        <Header hasSegment>
          <Body>
            <Segment>
              <Button active={activeFilter === 'default' ? true : null} first onPress={() => { changeFeed('default')}}><Text>Default</Text></Button>
              <Button active={activeFilter === 'liked' ? true : null} onPress={() => { changeFeed('liked')}} ><Text>Liked</Text></Button>
              <Button active={activeFilter === 'visited' ? true : null} onPress={() => {changeFeed('visited') }}><Text>Visited</Text></Button>
              <Button active={activeFilter === 'seenlist' ? true : null} last onPress={() => {changeFeed('seenlist') }}><Text>Seen</Text></Button>
            </Segment>
          </Body>
        </Header>
      </Container>
          </Header>
          <Content>
            <Deck arts={state.arts} setTag={setTag} />
          </Content>
      </Container>
    </Root>
  );
}