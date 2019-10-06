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

  const Item = ({comp}) => {
    return (
      <ArtCard comp={comp} setTag={setTag} />
    ) 
  }

  if (data) {
    return (
      <FlatList
        data={data}
        renderItem={({item}) => <Item comp={item.comp} />}
      />
    )
  }
  return null
};
