import * as WebBrowser from 'expo-web-browser';
import React, {useEffect} from 'react';
import Constants from 'expo-constants';

import { Container, Content } from "native-base";

import Deck from './Deck';

export default FeedScreen = ({navigation, user, arts, comments, setTag, postNewComment}) => {

  return (
      <Container style={{ marginTop: Constants.statusBarHeight }}>
        <Content>
          <Deck arts={arts} setTag={setTag} postNewComment={postNewComment} user={user} comments={comments} />
        </Content>
      </Container>
  );
}