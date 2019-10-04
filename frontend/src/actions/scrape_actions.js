import * as ScrapeUtil from "../util/scrape_util";

export const RECEIVE_INTERESTS = "RECEIVE_INTERESTS";
export const RECEIVE_URLS = "RECEIVE_URLS";


const receiveUrls = urls => ({
  type: RECEIVE_URLS,
  urls
});

export const scrapeUrls = url => dispatch => {
  console.time("scrape request");
  ScrapeUtil.scrape(url)
    .then(data => {
      console.timeEnd("scrape request");
      dispatch(receiveUrls(data));
    })
    .catch(res => {});
};
