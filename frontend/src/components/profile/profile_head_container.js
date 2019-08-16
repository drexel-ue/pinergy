import { connect } from "react-redux";
import ProfileHead from "./profile_head";

const mapStateToProps = ({ entities, session }) => {
  // debugger
  return {
    // boards: Object.values(entities.boards),
    // sections: Object.values(entities.sections),
    currentUser: entities.user
  };
};

// const mapDispatchToProps = dispatch => {
//   return {};
// };

export default connect(
  mapStateToProps,
  null
  // mapDispatchToProps
)(ProfileHead);
