import React from 'react';

import ArtCard from './ArtCard';
import { FlatList } from 'react-native-gesture-handler';

export default Deck = ({arts, user, postTag, filter, postNewComment, comments}) => {
  const data = Object.keys(arts).map(artId => {

    return {
      id: artId,
      comp: arts[artId],
      ogUser: users[arts[artId].user_id]
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
        data={filter}
        renderItem={({item}) => <ArtCard comp={arts[item]} postTag={setTag} postNewComment={postNewComment} user={user}/>}
        keyExtractor={item => item}
      />
    )
  }
  return null
};
