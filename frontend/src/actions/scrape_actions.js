import * as ScrapeUtil from "../util/scrape_util";

export const RECEIVE_INTERESTS = "RECEIVE_INTERESTS";

const receiveInterests = interests => ({
  type: RECEIVE_INTERESTS,
  interests
});

export const scrapeInterests = () => dispatch => {
  return ScrapeUtil.scrapeInterests()
    .then(({ data }) => {
      dispatch(receiveInterests(data));
    })
    .catch(res => {
      debugger;
    });
};
