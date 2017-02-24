import * as RedditClient from 'services/redditClient.js';

export const PROCESS_POSTS = 'PROCESS_POSTS';

export function fetchNewPostsInSubreddit(subreddit) {
  return (dispatch) => {
    return RedditClient.fetchNewPostsInSubreddit(subreddit).then((data) => {
      dispatch(processPosts(data));
    }).catch(() => {
      // Failed
    });
  };
}

export function processPosts(data) {
  return {
    type: PROCESS_POSTS,
    data,
  };
}
