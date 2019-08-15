import SessionButton from './session_button'
import { showFirstSignUpStep, moveToLogIn } from '../../actions/modal_actions'
import { connect } from 'react-redux'


const mapDispatchToProps = dispatch => {
  return {
    showFirstSignUpStep: () => dispatch(showFirstSignUpStep()),
    showLogin:  () => dispatch(moveToLogIn())
  };
};
export default connect(
  null, mapDispatchToProps
)(SessionButton)