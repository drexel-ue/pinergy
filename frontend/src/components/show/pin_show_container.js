import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PinShow from "./pin_show";
import { fetchPin } from "../../actions/pin_actions";

const msp = ({ entities }, { match }) => {
  return {
    pin: entities.pins[match.params.id]
  };
};
const mdp = dispatch => ({
  fetchPin: id => dispatch(fetchPin(id))
});

export default withRouter(
  connect(
    msp,
    mdp
  )(PinShow)
);
