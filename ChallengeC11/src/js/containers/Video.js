import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { playVideo, moveTime } from '../actions/actions-video';
import Video from '../components/Video';

function mapStateToProps(state) {
  const {
    paused,
    currentTime,
  } = state.video;

  return {
    paused,
    currentTime,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ playVideo, moveTime }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Video);
