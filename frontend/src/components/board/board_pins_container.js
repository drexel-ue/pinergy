import { connect } from "react-redux";
import BoardPins from "./board_pins";
import { fetchBoardPins } from "../../actions/pin_actions";

const msp = ({ entities }) => ({
    pins: entities.pins
});
const mdp = dispatch => ({
    fetchBoardPins: (boardID) => dispatch(fetchBoardPins(boardID))
});

export default connect(
    msp,
    mdp
)(BoardPins);