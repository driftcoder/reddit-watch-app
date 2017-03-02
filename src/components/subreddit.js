import _ from 'lodash';
import Howler from 'howler';
import React from 'react';
import { Tween, Easing } from 'tween.js';

import config from 'config/config.js';
import BottomBar from 'containers/bottomBar.js';
import Post from 'components/post.js';

const style = {
  main: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    fontFamily: 'AppFont',
    fontSize: '14px',
    color: '#999999',
  },
  posts: {
    position: 'absolute',
    top: 0,
    bottom: '21px',
    left: 0,
    right: 0,
    overflow: 'scroll',
    padding: '5px',
  },
  post: {
    marginBottom: '15px',
  },
};

const notificationSound = new Howler.Howl({
  src: ['../assets/notify.mp3']
});

let lastPostCount;
let autoScroll;

export default class Subreddit extends React.Component {
  static propTypes = {
    fetchNewPostsInSubreddit: React.PropTypes.func.isRequired,
    setAutoscroll: React.PropTypes.func.isRequired,
    data: React.PropTypes.object.isRequired,

    id: React.PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    lastPostCount = 0;
    autoScroll = true;
    this.fetchNewPosts = this.fetchNewPosts.bind(this);
    this.autoScrollIfNeeded = this.autoScrollIfNeeded.bind(this);
    this.scrollEvent = _.throttle(this.scrollEvent.bind(this), 100);
  }

  componentDidMount() {
    this.fetchNewPosts()
    setInterval(this.fetchNewPosts, config.refreshFrequencyInSeconds * 1000);
    setInterval(this.autoScrollIfNeeded, 1000);
    this.postsWrapper.addEventListener('mousewheel', this.scrollEvent);
  }

  componentWillReceiveProps(nextProps) {
    const postCount = nextProps.data.knownPosts.length;

    if (lastPostCount != postCount) {
      lastPostCount = postCount;
      setTimeout(() => notificationSound.play(), 1000);
    }
  }

  fetchNewPosts() {
    this.props.fetchNewPostsInSubreddit(this.props.id);
    this.startTimer();
  }

  scrollEvent() {
    autoScroll = this.isScrollAtBottom();
    this.props.setAutoscroll(autoScroll);
  }

  autoScrollIfNeeded() {
    if (autoScroll && !this.isScrollAtBottom()) {
      let tweenValues = {scroll: this.postsWrapper.scrollTop};
      let tween = new Tween(tweenValues)
        .to({scroll: this.postsWrapper.scrollHeight - this.postsWrapper.offsetHeight}, 500)
        .onStart((values) => tweenValues = values)
        .onComplete(() => tween = null)
        .onUpdate(() => this.postsWrapper.scrollTop = tweenValues.scroll)
        .easing(Easing.Exponential.InOut)
        .start();

      function animate(time) {
        if (!tween || !autoScroll) {
          tween = null;
          return;
        }

        tween.update(time);
        requestAnimationFrame(animate);
      }

      requestAnimationFrame(animate);
    }
  }

  isScrollAtBottom() {
    return (this.postsWrapper.offsetHeight + this.postsWrapper.scrollTop) >= this.postsWrapper.scrollHeight;
  }

  renderPostWithId(postId, last) {
    return(
      <div key={postId} style={last ? null : style.post}>
        <Post
          post={this.props.data.posts[postId]}
          revisions={this.props.data.postRevisions[postId]}
        />
      </div>
    );
  }

  render() {
    const postIds = this.props.data.knownPosts.slice(-50);

    return (
      <div style={style.main}>
        <div ref={(postsWrapper) => this.postsWrapper = postsWrapper} style={style.posts}>
          {postIds.map((postId) => this.renderPostWithId(postId, postId == _.last(postIds)))}
        </div>
        <BottomBar
          startTimerRef={(startTimer) => this.startTimer = startTimer}
          time={config.refreshFrequencyInSeconds}
          error={this.props.data.error}
        />
      </div>
    );
  }
}
