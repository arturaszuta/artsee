import React from 'react';

import ArtCard from './ArtCard';
import { FlatList } from 'react-native-gesture-handler';

export default Deck = ({arts, setTag, users}) => {
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
        data={data}
        renderItem={({item}) => <ArtCard comp={item.comp} ogUser={item.ogUser} setTag={setTag} />}
        keyExtractor={item => item.id}
      />
    )
  }
  return null
};
