import { connect } from 'react-redux';
import MapScreen from '../Components/MapScreen/MapScreen';
import {
  findUserLocation,
  setNearestArts
} from '../actions';


const mapStateToProps = state => ({
  arts: state.arts,
  currUserLocation: state.maps.userLocation
})

const mapDispatchToProps = dispatch => ({
  updateUserLocation: dispatch(findUserLocation()),
  setNearestArts: arts => dispatch(setNearestArts(arts))
})

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
