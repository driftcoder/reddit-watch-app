import {setError} from 'actions/error.js';
import * as RedditClient from 'services/redditClient.js';

export const PROCESS_POSTS = 'PROCESS_POSTS';
export const FETCH_FAILED = 'FETCH_FAILED'

export function fetchNewPostsInSubreddit(subreddit) {
  return (dispatch) => {
    return RedditClient.fetchNewPostsInSubreddit(subreddit).then((data) => {
      dispatch(processPosts(data));
    }).catch((error) => {
      dispatch(setError(error.message));
    });
  };
}

export function processPosts(data) {
  return {
    type: PROCESS_POSTS,
    data,
  };
}
