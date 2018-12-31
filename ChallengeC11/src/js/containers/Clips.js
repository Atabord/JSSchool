import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  addClip, editClip, deleteClip,
} from '../actions/actions-clips';
import {
  playClip,
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
    addClip, playClip, editClip, deleteClip,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Clips);
