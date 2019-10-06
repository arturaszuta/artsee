import React from 'react';

import ArtCard from './ArtCard';
import { FlatList } from 'react-native-gesture-handler';

export default Deck = ({arts, setTag}) => {
  const data = Object.keys(arts).map(artId => {

    return {
      id: artId,
      comp: arts[artId]
    }

  })

  if (data) {
    return (
      <FlatList
        data={data}
        renderItem={({item}) => <ArtCard comp={item.comp} setTag={setTag} />}
        keyExtractor={item => item.id}
      />
    )
  }
  return null
};
