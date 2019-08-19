import * as ScrapeUtil from "../util/scrape_util";

export const RECEIVE_INTERESTS = "RECEIVE_INTERESTS";

const receiveInterests = interests => ({
  type: RECEIVE_INTERESTS,
  interests
});

export const scrapeInterests = () => dispatch => {
  console.time("scrape request");
  return ScrapeUtil.scrapeInterests()
    .then(({ data }) => {
      console.timeEnd("scrape request");
      dispatch(receiveInterests(data));
    })
    .catch(res => {
    });
};
