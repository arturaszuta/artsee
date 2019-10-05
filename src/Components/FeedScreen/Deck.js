import React from 'react';

import ArtCard from './ArtCard';

export default Deck = ({arts, setTag}) => {
  if (arts) {
    return Object.keys(arts).map(artId => {

      const comp = arts[artId];

      return (
        <ArtCard comp={comp} onPress={(type) => setTag(comp.id, type)} key={comp.id} />
      ) 
    })
  }
  return null
};