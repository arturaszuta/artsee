import React from 'react';

import ArtCard from './ArtCard';
import { FlatList } from 'react-native-gesture-handler';

export default Deck = ({arts, postTag, filter, user }) => {
  const data = Object.keys(arts).map(artId => {

    return {
      id: artId,
      comp: arts[artId],
      ogUser: users[arts[artId].user_id]
    }

  })

  if (data) {
    return (
      <FlatList
        data={filter}
        renderItem={({item}) => <ArtCard comp={arts[item]} postTag={postTag} user={user} />}
        keyExtractor={item => item}
      />
    )
  }
  return null
};
