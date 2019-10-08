import { connect } from 'react-redux'
import { applyFilter, setFilterArray, postTag, fetchAllComments, postNewComment } from '../actions'
import FeedScreen from '../Components/FeedScreen/FeedScreen'


const mapStateToProps = (state) => ({
  arts:  state.arts,
  user: state.users.user,
  filterArray: state.filterArray,
  users: state.users,
  comments: state.comments,
})

const mapDispatchToProps = dispatch => ({
  postTag: (id, type, value, user) => dispatch(postTag(id, type, value, user)),
  applyFilter: param => dispatch(applyFilter(param)),
  setFilterArray: array => dispatch(setFilterArray(array)),
  postNewComment: (art_id, user_id, newComment) =>
    dispatch(postNewComment(art_id, user_id, newComment))
});



export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen)