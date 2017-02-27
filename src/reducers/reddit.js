import _ from 'lodash';

import {PROCESS_POSTS} from 'actions/reddit.js';

const initialState = {
  posts: {},
  knownPosts: [],
  postRevisions: {},
  knownPostRevisions: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PROCESS_POSTS:
      let newState = _.merge({}, state);

      action.data.reverse().forEach((post) => {
        if (!newState.posts[post.id]) {
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
    default:
      return state;
  }
};
