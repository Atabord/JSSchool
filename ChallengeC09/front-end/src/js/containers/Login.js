import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../actions/actions-users';
import Login from '../components/Login-component';

function mapStateToProps(state) {
  return {
    isLogged: state.user.isLogged,
    loginError: state.user.loginError,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
