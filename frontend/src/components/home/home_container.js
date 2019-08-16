import { connect } from "react-redux";
import Home from "./home";
import { fetchPins } from "../../actions/pin_actions";

const msp = ({ entities }) => ({
  pins: entities.pins
});
const mdp = dispatch => ({
  getAll: () => dispatch(fetchPins([]))
});

export default connect(
  msp,
  mdp
)(Home);
