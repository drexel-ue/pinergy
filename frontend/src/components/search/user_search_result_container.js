import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UserSearchResult from "./user_search_result";

const msp = (state, ownProps) => {
  return {
    user: ownProps.user,
    queryString: ownProps.queryString
  };
};
const mdp = dispatch => ({});

export default withRouter(
  connect(
    msp,
    mdp
  )(UserSearchResult)
);
