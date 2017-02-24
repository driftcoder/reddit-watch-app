import {connect} from 'react-redux';

import {fetchNewPostsInSubreddit} from 'actions/reddit.js';
import SubredditComponent from 'components/subreddit.js';

const mapStateToProps = (state) => {
  return {
    data: state.reddit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNewPostsInSubreddit: (subreddit) => {
      return dispatch(fetchNewPostsInSubreddit(subreddit));
    }
  };
};

const Subreddit = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubredditComponent);

export default Subreddit;
