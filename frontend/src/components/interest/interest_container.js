import Interest from "./interest";
import { connect } from "react-redux";
import { scrapeInterests } from "../../actions/scrape_actions";

const mapStateToProps = (state, ownProps) => ({
  interest: ownProps.interest
});

const mapDispatchToProps = dispatch => ({
  scrape: interest => dispatch(scrapeInterests(interest))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Interest);
