import { connect } from 'react-redux'
import { setTag, fetchAllComments, postNewComment } from '../actions'
import FeedScreen from '../Components/FeedScreen/FeedScreen'


const mapStateToProps = state => ({
  arts: state.arts,
  comments: state.comments,
  user: state.users.user
});

const mapDispatchToProps = dispatch => ({
  setTag: (id, type, value) => dispatch(setTag(id, type, value)),
  postNewComment: (art_id, user_id, newComment) => dispatch(postNewComment(art_id, user_id, newComment))
})

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen)