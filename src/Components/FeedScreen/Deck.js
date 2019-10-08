import React from 'react';

import ArtCard from './ArtCard';
import { FlatList } from 'react-native-gesture-handler';

export default Deck = ({arts, user, postNewComment, comments, postTag, filter, users}) => {

  // console.log("==|==|> comments:",comments)
  const data = filter.map(artId => {
    const artComments = comments.filter(comment => comment.art_id === arts[artId].id );
    return {
      id: artId,
      comp: arts[artId],
      ogUser: users[arts[artId].user_id],
      comments: artComments
    }

  })

  if (data) {
    return (
      <FlatList
        data={data}
        renderItem={({item}) => <ArtCard comp={item.comp} postTag={postTag} postNewComment={postNewComment} user={user} ogUser={item.ogUser} comments={item.comp.comments} users={users} />}
        keyExtractor={item => item.id}
      />
    )
  }
  return null
};
