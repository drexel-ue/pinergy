import { connect, withRouter } from "react-redux";
import PinShow from "./pin_show";

const msp = ({ entities }, ownProps) => {
  return {
    pin: entities.pins[ownProps.match.params.id]
  };
};
const mdp = dispatch => ({});

export default withRouter(
  connect(
    msp,
    mdp
  )(PinShow)
);
