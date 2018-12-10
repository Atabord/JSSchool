import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeUrl } from '../actions/actions-books';
import Section from '../components/Section-component';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeUrl }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(Section));
