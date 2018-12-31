import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  playVideo, moveTime, muteVideo, changeVolume, showTimeRunning, playClip,
} from '../actions/actions-video';
import Video from '../components/Video';

function mapStateToProps(state) {
  const {
    paused,
    currentTime,
    muted,
    videoSource,
    volume,
    currentClip,
    expanded,
  } = state.video;

  const { clips } = state;

  return {
    paused,
    currentTime,
    muted,
    videoSource,
    currentClip,
    volume,
    expanded,
    clips,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    playVideo, moveTime, muteVideo, changeVolume, showTimeRunning, playClip,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Video);
