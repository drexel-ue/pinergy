import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PinShow from "./pin_show";

const msp = ({ entities }, { match }) => {
  return {
    pin: entities.pins[match.params.id]
  };
};
const mdp = dispatch => ({});

export default withRouter(
  connect(
    msp,
    mdp
  )(PinShow)
);
