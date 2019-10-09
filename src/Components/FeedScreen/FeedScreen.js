import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import filterArts from "../../helpers/filterArts"
import Constants from 'expo-constants';

import { Container, Content, Segment, Button, Text, Header, Body } from "native-base";

import Deck from './Deck';

export default FeedScreen = ({ navigation, arts, postTag, setFilterArray, filterArray, user, comments, postNewComment, users }) => {

  console.log("==|==|> arts[35]:",arts[35])

  const [activeFilter, setActiveFilter] = useState('default');

  const changeFeed = async function(param) {
    setActiveFilter(param);
    const resolvedArray = filterArts(arts, param);
    setFilterArray(resolvedArray);
  }

  return (
    <Container>
      <Header style={{ marginTop: Constants.statusBarHeight }}>
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
        <Deck arts={arts} postTag={postTag} filter={filterArray} user={user} postNewComment={postNewComment} comments={comments} users={users} />
      </Content>
    </Container>
  )
}