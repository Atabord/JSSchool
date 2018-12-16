import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { searchBook } from '../actions/actions-books';
import BookInfo from '../components/Books/bookInfo-component';

function mapStateToProps(state) {
  const {
    error,
    isLoaded,
    book,
    pagination,
    message,
    url,
  } = state.books;
  const {
    username,
  } = state.user;

  return {
    error,
    isLoaded,
    book,
    message,
    pagination,
    url,
    username,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchBook }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookInfo);
