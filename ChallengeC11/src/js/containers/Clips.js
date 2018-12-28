import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  addClip,
} from '../actions/actions-clips';
import {
  playVideo
} from '../actions/actions-video';
import Clips from '../components/Clips';

function mapStateToProps(state) {
  const {
    clips,
  } = state;

  return {
    clips,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addClip, playVideo,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Clips);
