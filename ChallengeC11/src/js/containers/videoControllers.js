import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  playVideo, moveTime, muteVideo, changeVolume, expandVideo,
} from '../actions/actions-video';
import VideoControllers from '../components/videoControllers';

function mapStateToProps(state) {
  const {
    paused,
    currentTime,
    muted,
    volume,
    expanded,
  } = state.video;

  return {
    paused,
    currentTime,
    muted,
    volume,
    expanded,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    playVideo, moveTime, muteVideo, changeVolume, expandVideo,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoControllers);
