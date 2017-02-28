import * as RedditClient from 'services/redditClient.js';

export const PROCESS_POSTS = 'PROCESS_POSTS';
export const FETCH_FAILED = 'FETCH_FAILED'

export function fetchNewPostsInSubreddit(subreddit) {
  return (dispatch) => {
    return RedditClient.fetchNewPostsInSubreddit(subreddit).then((data) => {
      dispatch(processPosts(data));
    }).catch((error) => {
      dispatch(fetchFailed(error));
    });
  };
}

export function processPosts(data) {
  return {
    type: PROCESS_POSTS,
    data,
  };
}

export function fetchFailed(error) {
  return {
    type: FETCH_FAILED,
    message: error.message,
  }
}
