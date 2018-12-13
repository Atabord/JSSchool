import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { verifyToken } from '../actions/actions-users';
import App from '../components/App/App-component';

function mapStateToProps(state) {
  return {
    isLogged: state.user.isLogged,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ verifyToken }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
