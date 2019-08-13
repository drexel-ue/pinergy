
import { connect } from "react-redux";
import App from "./app";
import { showFirstSignUpStep } from "../actions/modal_actions";



const mapDispatchToProps = dispatch => ({
  showFirstSignUpStep: () => dispatch(showFirstSignUpStep())
});

export default connect(
  null,
  mapDispatchToProps
)(App);
