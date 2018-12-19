import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { playVideo } from '../actions/actions-video';
import App from '../components/App';

function mapStateToProps(state) {
  const {
    paused,
  } = state.video;

  return {
    paused,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ playVideo }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
