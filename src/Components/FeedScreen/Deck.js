import React from 'react';

import ArtCard from './ArtCard';
import { FlatList } from 'react-native-gesture-handler';

export default Deck = ({arts, setTag, filter }) => {
  const data = Object.keys(arts).map(artId => {

    return {
      id: artId,
      comp: arts[artId]
    }

  })

  if (data) {
    return (
      <FlatList
        data={filter}
        renderItem={({item}) => <ArtCard comp={arts[item]} setTag={setTag} />}
        keyExtractor={item => item}
      />
    )
  }
  return null
};
