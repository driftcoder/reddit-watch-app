import _ from 'lodash';
import Howler from 'howler';
import React from 'react';
import { Tween, Easing } from 'tween.js';

import config from 'config/config.js';
import Post from 'components/post.js';

const timerBarRefilTimeInSeconds = 0.5;

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
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '20px',
    borderTop: '1px solid #999999',
    padding: '0 5px',
  },
  bottomBarItem: {
    display: 'inline-block',
    height: '20px',
    lineHeight: '20px',
    marginRight: '10px',
    float: 'left',
  },
  bottomBarItemOff: {
    display: 'inline-block',
    height: '20px',
    lineHeight: '20px',
    marginRight: '10px',
    float: 'left',
    color: '#333333',
  },
  bottomBarOptionItem: {
    display: 'inline-block',
    height: '20px',
    lineHeight: '20px',
    marginRight: '10px',
    float: 'right',
    cursor: 'pointer',
  },
  bottomBarOptionItemOff: {
    display: 'inline-block',
    height: '20px',
    lineHeight: '20px',
    marginRight: '10px',
    float: 'right',
    color: '#333333',
    cursor: 'pointer',
  },
  timerBarFull: {
    position: 'absolute',
    top: '7px',
    height: '7px',
    width: '100px',
    backgroundColor: '#73AF00',
    borderRadius: '4px',
    transition: 'width ' + timerBarRefilTimeInSeconds +'s linear',
  },
  timerBarRunning: {
    width: '8px',
    transition: 'width ' + (config.refreshFrequencyInSeconds - timerBarRefilTimeInSeconds) +'s linear',
  },
  timerBarShadow: {
    margin: '7px 0 0',
    height: '7px',
    width: '100px',
    backgroundColor: '#333333',
    borderRadius: '4px',
  },
};

const notificationSound = new Howler.Howl({
  src: ['../assets/notify.mp3']
});

export default class Subreddit extends React.Component {
  static propTypes = {
    fetchNewPostsInSubreddit: React.PropTypes.func.isRequired,

    id: React.PropTypes.string.isRequired,
    data: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      postCount: 0,
      autoScroll: true,
      showImages: true,
    }
    this.fetchNewPosts = this.fetchNewPosts.bind(this);
    this.autoScrollIfNeeded = this.autoScrollIfNeeded.bind(this);
    this.toggleShowImages = this.toggleShowImages.bind(this);
    this.scrollEvent = _.throttle(this.scrollEvent.bind(this), 100);
  }

  componentDidMount() {
    this.fetchNewPosts()
    setInterval(this.fetchNewPosts, config.refreshFrequencyInSeconds * 1000);
    setInterval(this.autoScrollIfNeeded, 1000);
    this.postsWrapper.addEventListener('scroll', this.scrollEvent);
  }

  componentWillReceiveProps(nextProps) {
    const postCount = nextProps.data.knownPosts.length;

    if (this.state.postCount != postCount) {
      this.setState({postCount});
      notificationSound.play();
    }
  }

  fetchNewPosts() {
    this.timerBar.style.transition = style.timerBarFull.transition;
    this.timerBar.style.width = style.timerBarFull.width;
    setTimeout(() => {
      this.timerBar.style.transition = style.timerBarRunning.transition;
      this.timerBar.style.width = style.timerBarRunning.width;
    }, timerBarRefilTimeInSeconds * 1000);
    this.props.fetchNewPostsInSubreddit(this.props.id)
  }

  scrollEvent() {
    this.setState({autoScroll: this.isScrollAtBottom()});
  }

  autoScrollIfNeeded() {
    if (this.state.autoScroll && !this.isScrollAtBottom()) {
      let tweenValues = {scroll: this.postsWrapper.scrollTop};
      let tween = new Tween(tweenValues)
        .to({scroll: this.postsWrapper.scrollHeight - this.postsWrapper.offsetHeight}, 1000)
        .onStart((values) => tweenValues = values)
        .onComplete(() => tween = null)
        .onUpdate(() => this.postsWrapper.scrollTop = tweenValues.scroll)
        .easing(Easing.Exponential.InOut)
        .start();

      function animate(time) {
        if (tween) {
          tween.update(time);
          requestAnimationFrame(animate);
        }
      }

      requestAnimationFrame(animate);
    }
  }

  isScrollAtBottom() {
    return (this.postsWrapper.offsetHeight + this.postsWrapper.scrollTop) >= this.postsWrapper.scrollHeight;
  }

  toggleShowImages() {
    this.setState((state) => ({showImages: !state.showImages}));
  }

  renderPostWithId(postId, last) {
    const postStyle = last ? style.lastPost : style.post;

    return(
      <div key={postId} style={last ? null : style.post}>
        <Post
          post={this.props.data.posts[postId]}
          revisions={this.props.data.postRevisions[postId]}
          showImages={this.state.showImages}
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
        <div style={style.bottomBar}>
          <div style={style.bottomBarItem}>
            <div style={style.timerBarShadow}/>
            <div ref={(timerBar) => this.timerBar = timerBar} style={style.timerBarFull}/>
          </div>
          <div style={this.state.autoScroll ? style.bottomBarItem : style.bottomBarItemOff}>
            <i className="fa fa-arrow-circle-down"/>
          </div>
          {this.props.data.error && (
            <div style={style.bottomBarItem}>
              {this.props.data.error}
            </div>
          )}
          <div style={this.state.showImages ? style.bottomBarOptionItem : style.bottomBarOptionItemOff}>
            <i className="fa fa-picture-o" onClick={this.toggleShowImages}/>
          </div>
        </div>
      </div>
    );
  }
}
