import { connect } from 'react-redux'
import { setTag } from '../actions'
import FeedScreen from '../Components/FeedScreen/FeedScreen'


const mapStateToProps = (state) => ({
  arts:  state.arts
})

const mapDispatchToProps = dispatch => ({
  setTag: (id, type, value) => dispatch(setTag(id, type, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen)