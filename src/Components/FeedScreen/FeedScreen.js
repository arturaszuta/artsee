import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import useApplicationData from '../../hooks/useApplicationData';

import { Container, Header, Content, Root } from "native-base";

import Deck from './Deck';
=======
import Constants from 'expo-constants';
import filterArts from "../../helpers/filterArts"

import { Container, Content, Segment, Button, Text, Header, Body } from "native-base";

import Deck from './Deck';
import { setAutoFocusEnabled } from 'expo/build/AR';
>>>>>>> feature/feedfilter

export default FeedScreen = ({navigation, arts, postTag, applyFilter, setFilterArray, filterArray, user }) => {

  const [activeFilter, setActiveFilter] = useState('default');

  useEffect(() => {
  }
  ,[arts])

  const changeFeed = async function(param) {
    setActiveFilter(param);
    const resolvedArray = filterArts(arts, param);
    setFilterArray(resolvedArray);
  }

<<<<<<< HEAD
export default function FeedScreen() {
  
  const {
    state,
    setTag
  } = useApplicationData();

   const stateArray = Object.keys(state.arts).map((el) => state.arts[el]);
   const renderedCards = stateArray.slice(0,20);


   
=======

>>>>>>> feature/feedfilter

  return (
  
        <Container>
          <Header style={{ marginTop: 20 }}>
          <Container>
        <Header hasSegment>
          <Body>
            <Segment>
              <Button active={activeFilter === 'default' ? true : null} first onPress={() => { changeFeed('default')}}><Text>Default</Text></Button>
              <Button active={activeFilter === 'liked' ? true : null} onPress={() => { changeFeed('liked')}} ><Text>Liked</Text></Button>
              <Button active={activeFilter === 'visited' ? true : null} onPress={() => {changeFeed('visited') }}><Text>Visited</Text></Button>
              <Button active={activeFilter === 'seelist' ? true : null} last onPress={() => {changeFeed('seelist') }}><Text>Seen</Text></Button>
            </Segment>
          </Body>
        </Header>
      </Container>
          </Header>
          <Content>
            <Deck arts={arts} postTag={postTag} filter={filterArray} user={user}/>
          </Content>
      </Container>
  
  );
}