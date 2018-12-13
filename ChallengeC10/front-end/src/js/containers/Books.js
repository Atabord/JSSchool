import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { searchBook } from '../actions/actions-books';
import Books from '../components/Books/Books-component';

function mapStateToProps(state) {
  const {
    error,
    isLoaded,
    books,
    pagination,
    url,
  } = state.books;

  return {
    error,
    isLoaded,
    books,
    pagination,
    url,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchBook }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Books);
