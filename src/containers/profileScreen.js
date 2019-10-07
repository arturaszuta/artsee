import { connect } from 'react-redux';
import { setTag } from '../actions';
import ProfileScreen from '../Components/ProfileScreen/ProfileScreen';


const mapStateToProps = state => ({
  arts: state.arts,
  user: state.users.user
})

const mapDispatchToProps = dispatch => ({
  setTag: (id, opt, value) => dispatch(setTag(id, opt, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);