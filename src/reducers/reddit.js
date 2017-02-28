import _ from 'lodash';

import { FETCH_FAILED, PROCESS_POSTS } from 'actions/reddit.js';

const initialState = {
  posts: {},
  knownPosts: [],
  postRevisions: {},
  knownPostRevisions: {},
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PROCESS_POSTS:
      let newState = _.merge({}, state, {error: null});

      action.data.reverse().forEach((post) => {
        if (!newState.posts[post.id]) {
          // New post
          newState.knownPosts.push(post.id);
          newState.postRevisions[post.id] = [];
          newState.knownPostRevisions[post.id] = [post.hash];
        } else if (!newState.knownPostRevisions[post.id].includes(post.hash)) {
          // New revision
          newState.postRevisions[post.id].push(newState.posts[post.id]);
          newState.knownPostRevisions[post.id].push(post.hash);
        }

        newState.posts[post.id] = post;
      });

      return newState;
    case FETCH_FAILED:
      return _.merge({}, state, {error: action.message});
    default:
      return state;
  }
};
