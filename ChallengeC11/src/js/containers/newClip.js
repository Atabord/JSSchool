import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  addClip,
} from '../actions/actions-clips';
import NewClip from '../components/newClip';

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
    addClip,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewClip);
