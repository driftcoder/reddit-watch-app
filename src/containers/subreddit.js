import {connect} from 'react-redux';

import {setAutoscroll} from 'actions/preferences.js';
import {fetchNewPostsInSubreddit} from 'actions/reddit.js';
import SubredditComponent from 'components/subreddit.js';

const mapStateToProps = (state) => {
  return {
    data: state.reddit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNewPostsInSubreddit: (subreddit) => dispatch(fetchNewPostsInSubreddit(subreddit)),
    setAutoscroll: (autoscroll) => dispatch(setAutoscroll(autoscroll)),
  };
};

const Subreddit = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubredditComponent);

export default Subreddit;
