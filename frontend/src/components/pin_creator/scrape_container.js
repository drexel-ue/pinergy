import { connect } from "react-redux";
import { scrapeUrls } from "../../actions/scrape_actions"

import Scrape from "./scrape";

// const mapStateToProps = (state) => {
//   debugger 
  
//   }
const mapDispatchToProps = dispatch => {
  return {
    scrapeUrls: url => dispatch(scrapeUrls(url))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Scrape);
