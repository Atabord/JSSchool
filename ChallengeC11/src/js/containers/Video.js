import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  playVideo, moveTime, muteVideo, changeVolume, showTimeRunning,
} from '../actions/actions-video';
import Video from '../components/Video';

function mapStateToProps(state) {
  const {
    paused,
    currentTime,
    muted,
    videoSource,
    volume,
    expanded,
  } = state.video;

  return {
    paused,
    currentTime,
    muted,
    videoSource,
    volume,
    expanded,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    playVideo, moveTime, muteVideo, changeVolume, showTimeRunning,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Video);
