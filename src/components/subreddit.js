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
  bottmBarItem: {
    display: 'inline-block',
    width: '100px',
    height: '20px',
    lineHeight: '20px',
    marginRight: '10px',
    float: 'left',
  },
  timerBarFull: {
    position: 'absolute',
    top: '7px',
    height: '8px',
    width: '100px',
    backgroundColor: '#73AF00',
    borderRadius: '4px',
    transition: `width 0.5s`,
  },
  timerBarFull: {
    position: 'absolute',
    top: '7px',
    height: '8px',
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
    position: 'absolute',
    top: '7px',
    height: '8px',
    width: '100px',
    backgroundColor: '#222222',
    borderRadius: '4px',
  },
};

const notificationSound = new Howler.Howl({
  src: ['../assets/notify.mp3']
});

export default class Subreddit extends React.PureComponent {
  static propTypes = {
    fetchNewPostsInSubreddit: React.PropTypes.func.isRequired,

    id: React.PropTypes.string.isRequired,
    data: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      lastPostId: null,
      autoScroll: true,
    }
    this.fetchNewPosts = this.fetchNewPosts.bind(this);
    this.scrollEvent = _.throttle(this.scrollEvent.bind(this), 100);
    this.autoScrollIfNeeded = _.debounce(this.autoScrollIfNeeded.bind(this), 500);
  }

  componentDidMount() {
    this.fetchNewPosts()
    setInterval(this.fetchNewPosts, config.refreshFrequencyInSeconds * 1000);
    this.postsWrapper.addEventListener('scroll', this.scrollEvent);
  }

  componentWillReceiveProps(nextProps) {
    const lastPostId = _.last(nextProps.data.postsByDate).id;

    if (this.state.lastPostId != lastPostId) {
      this.setState({lastPostId});
      notificationSound.play();
    }
  }

  componentDidUpdate() {
    this.autoScrollIfNeeded();
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

  renderPostWithId(postId, last) {
    const postStyle = last ? style.lastPost : style.post;

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
    const postIds = this.props.data.postsByDate.slice(-50).map((postByDate) => postByDate.id);
    const lastPostId = _.last(postIds);

    return (
      <div style={style.main}>
        <div ref={(postsWrapper) => this.postsWrapper = postsWrapper} style={style.posts}>
          {postIds.map((postId) => this.renderPostWithId(postId, postId == lastPostId))}
        </div>
        <div style={style.bottomBar}>
          <div style={style.bottmBarItem}>
            <div style={style.timerBarShadow}/>
            <div ref={(timerBar) => this.timerBar = timerBar} style={style.timerBarFull}/>
          </div>
          <div style={style.bottmBarItem}>
            {this.state.autoScroll && (<i className="fa fa-arrow-circle-down"/>)}
          </div>
        </div>
      </div>
    );
  }
}
