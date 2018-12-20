import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  playVideo, moveTime, muteVideo, changeVolume,
} from '../actions/actions-video';
import Video from '../components/Video';

function mapStateToProps(state) {
  const {
    paused,
    currentTime,
    muted,
    volume,
  } = state.video;

  return {
    paused,
    currentTime,
    muted,
    volume,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ playVideo, moveTime, muteVideo, changeVolume }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Video);
