import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Pin from "./pin";
import { showPin } from "../../actions/modal_actions";

const msp = ({ session, entities }, ownProps) => ({
  user: session.isAuthenticated ? entities.users[session.user.id] : {},
  pin: ownProps.pin
});

const mdp = dispatch => ({
  showPin: id => dispatch(showPin(id))
});

export default withRouter(
  connect(
    msp,
    mdp
  )(Pin)
);
