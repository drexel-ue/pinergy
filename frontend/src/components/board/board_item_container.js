import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import BoardItem from "./board_item";
// import { fetchUserBoards } from "../../actions/board_actions";
import { fetchBoardPins} from "../../actions/pin_actions"

const msp = ({ session, entities }, ownProps) => {
    let pins = "";
    if (entities.pins) {
        pins = Object.values(entities.pins).find(
            pin => pin.board === ownProps.board.id
        )
    }
    
    return {
        pins: pins
    };
};

const mdp = dispatch => {
    return {
        fetchBoardPins: board_id => dispatch(fetchBoardPins(board_id))
    };
};

export default withRouter(
    connect(
        msp,
        mdp
    )(BoardItem)
);
