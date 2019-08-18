import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PinShow from "./pin_show";

const msp = ({ entities, ui }) => {
  return {
    pin: entities.pins[ui.modal.id]
  };
};
const mdp = dispatch => ({});

export default withRouter(
  connect(
    msp,
    mdp
  )(PinShow)
);
