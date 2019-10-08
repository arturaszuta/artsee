import React from 'react';

import ArtCard from './ArtCard';
import { FlatList } from 'react-native-gesture-handler';

<<<<<<< HEAD
export default Deck = ({arts, postTag, filter, user }) => {
=======
export default Deck = ({arts, user, setTag, postNewComment, comments}) => {
>>>>>>> comments
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
<<<<<<< HEAD
        data={filter}
        renderItem={({item}) => <ArtCard comp={arts[item]} postTag={postTag} user={user} />}
        keyExtractor={item => item}
=======
        data={data}
        renderItem={({item}) => <ArtCard comp={item.comp} setTag={setTag} postNewComment={postNewComment} user={user}/>}
        keyExtractor={item => item.id}
>>>>>>> comments
      />
    )
  }
  return null
};
