import { connect } from "react-redux";
import Profile from "./profile";
import { withRouter } from "react-router-dom";

const mapStateToProps = ({ entities, session }, ownProps) => {
  return {
    // boards: Object.values(entities.boards),
    // sections: Object.values(entities.sections),
    user: Object.values(entities.users).find(
      user => user.username == ownProps.match.params.username
    ),
    currentUser: session.user,
    entities: entities
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Profile)
);

