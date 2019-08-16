import { connect } from "react-redux";
import Profile from "./profile";

const mapStateToProps = ({ entities, session }) => {
  // debugger
  return {
    // boards: Object.values(entities.boards),
    // sections: Object.values(entities.sections),
    currentUser: session.user,
    entities: entities
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
