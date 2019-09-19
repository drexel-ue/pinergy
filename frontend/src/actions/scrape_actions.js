import * as ScrapeUtil from "../util/scrape_util";

export const RECEIVE_INTERESTS = "RECEIVE_INTERESTS";
export const RECEIVE_URLS = "RECEIVE_URLS"
const receiveInterests = interests => ({
  type: RECEIVE_INTERESTS,
  interests
});

const receiveUrls = urls => ({
  type: RECEIVE_URLS,
  urls
})

// export const scrapeInterests = () => dispatch => {
//   console.time("scrape request");
//   return ScrapeUtil.scrape()
//     .then(({ data }) => {
//       console.timeEnd("scrape request");
//       dispatch(receiveInterests(data));
//     })
//     .catch(res => {
//     });
// };

export const scrapeUrls = (url) => dispatch => {
  debugger
  console.time("scrape request");
   ScrapeUtil.scrape(url)
    .then(( data ) => {
      debugger
      console.timeEnd("scrape request");
      dispatch(receiveUrls(data));
    })
    .catch(res => {
    });
};
