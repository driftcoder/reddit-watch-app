import _ from 'lodash';

import {PROCESS_POSTS} from 'actions/reddit.js';

const initialState = {
  posts: {},
  postRevisions: {},
  knownPosts: {},
  postsByDate: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PROCESS_POSTS:
      let newState = Object.assign({}, state);

      action.data.forEach((post) => {
        if (!newState.knownPosts[post.id]) {
          // New Post
          const postByDate = {
            id: post.id,
            date: post.date
          };

          newState.knownPosts[post.id] = [post.hash];
          newState.postRevisions[post.id] = [];
          newState.postsByDate.splice(_.sortedIndexBy(newState.postsByDate, postByDate, 'date'), 0, postByDate);
        } else if (!newState.knownPosts[post.id].includes(post.hash)) {
          // New revision
          newState.postRevisions[post.id].push(newState.posts[post.id]);
          newState.knownPosts[post.id].push(post.hash);
        }

        newState.posts[post.id] = post;
      });

      return newState;
    default:
      return state;
  }
};
