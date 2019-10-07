import React from 'react';

import ArtCard from './ArtCard';

export default Deck = ({arts, setTag}) => {
  if (arts) {
    return arts.map(artId => {
      return (
        <ArtCard comp={artId} setTag={setTag} />
      ) 
    })
  }
  return null
};