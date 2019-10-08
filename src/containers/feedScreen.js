import { connect } from 'react-redux'
import { setTag, applyFilter, setFilterArray, postTag } from '../actions'
import FeedScreen from '../Components/FeedScreen/FeedScreen'


const mapStateToProps = (state) => ({
  arts:  state.arts,
  user: state.users.user,
  filterArray: state.filterArray,
  users: state.users
})

const mapDispatchToProps = dispatch => ({
  postTag: (id, type, value, user) => dispatch(postTag(id, type, value, user)),
  applyFilter: (param) => dispatch(applyFilter(param)),
  setFilterArray: (array) => dispatch(setFilterArray(array))
})

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen)