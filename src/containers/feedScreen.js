import { connect } from 'react-redux'
import { setTag, applyFilter, setFilterArray } from '../actions'
import FeedScreen from '../Components/FeedScreen/FeedScreen'


const mapStateToProps = (state) => ({
  arts:  state.arts,
  user: state.users.user,
  filterArray: state.filterArray
})

const mapDispatchToProps = dispatch => ({
  setTag: (id, type, value) => dispatch(setTag(id, type, value)),
  applyFilter: (param) => dispatch(applyFilter(param)),
  setFilterArray: (array) => dispatch(setFilterArray(array))
})

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen)