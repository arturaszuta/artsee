import React from 'react';

import ArtCard from './ArtCard';
import { FlatList } from 'react-native-gesture-handler';

export default Deck = ({arts, user, setTag, postNewComment, comments}) => {
  const data = Object.keys(arts).map(artId => {

    return {
      id: artId,
      comp: arts[artId]
    }

  })

  // append comments to arts
  if (comments && data) {
    data.forEach((item, idx) => {
     item.comp.comments = comments.filter(comment => comment.art_id === item.comp.id );
    });
  }
  if (comments && data) {
    return (
      <FlatList
        data={data}
        renderItem={({item}) => <ArtCard comp={item.comp} setTag={setTag} postNewComment={postNewComment} user={user}/>}
        keyExtractor={item => item.id}
      />
    )
  }
  return null
};
