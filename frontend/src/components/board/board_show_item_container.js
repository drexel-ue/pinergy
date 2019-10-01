import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Pin from "../pin/pin";
import { showPin } from "../../actions/modal_actions";

const mdp = dispatch => ({
  showPin: id => dispatch(showPin(id))
});

export default withRouter(
  connect(
    null,
    mdp
  )(Pin)
);
