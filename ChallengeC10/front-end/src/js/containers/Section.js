import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeUrl } from '../actions/actions-books';
import Section from '../components/MainSection/Section-component';

function mapStateToProps(state) {
  const { notFound } = state.books;
  return { notFound };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeUrl }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Section));
