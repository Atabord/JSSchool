import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  playVideo, moveTime, muteVideo, changeVolume, expandVideo, playClip,
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

  const { clips } = state;

  return {
    paused,
    currentTime,
    muted,
    volume,
    expanded,
    clips,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    playVideo, moveTime, muteVideo, changeVolume, expandVideo, playClip,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoControllers);
