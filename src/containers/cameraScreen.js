import { connect } from 'react-redux'
import { setArts } from '../actions'
import CameraScreen from '../Components/CameraScreen'

const mapStateToProps = (state) => ({
  user: state.users.user
})

const mapDispatchToProps = dispatch => ({
  setArts: id => dispatch(setArts(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen)