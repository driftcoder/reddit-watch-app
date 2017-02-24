import _ from 'lodash';
import Howler from 'howler';
import { Line } from 'rc-progress';
import React from 'react';
import TWEEN from 'tween.js';

import config from 'config/config.js';
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
    marginRight: '10px',
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
      timerTicks: 0,
      lastPostId: null,
      autoScroll: true,
    }
    this.timerTickEvent = this.timerTickEvent.bind(this);
    this.scrollEvent = _.throttle(this.scrollEvent.bind(this), 100);
    this.autoScrollIfNeeded = _.debounce(this.autoScrollIfNeeded.bind(this), 500);
  }

  componentDidMount() {
    this.props.fetchNewPostsInSubreddit(this.props.id);
    setInterval(this.timerTickEvent, 1000);
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

  timerTickEvent() {
    let timerTicks = this.state.timerTicks + 1;

    if (timerTicks >= config.refreshFrequencyInSeconds) {
      this.props.fetchNewPostsInSubreddit(this.props.id)
      timerTicks = 0;
    }

    this.setState({timerTicks});
  }

  scrollEvent() {
    this.setState({autoScroll: this.isScrollAtBottom()});
  }

  autoScrollIfNeeded() {
    if (this.state.autoScroll && !this.isScrollAtBottom()) {
      var tween = new TWEEN.Tween({x: 0, y: 0})
        .to({x: 400, y: 400}, 1000)
        .onUpdate(function () {
          console.log(this);
        })
        .start();

      function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
      }

      requestAnimationFrame(animate);
      this.postsWrapper.scrollTop = this.postsWrapper.scrollHeight - this.postsWrapper.offsetHeight;
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
    const progressLeftPercent =
      config.refreshFrequencyInSeconds < 1 ?
      0 :
      100 * (config.refreshFrequencyInSeconds - this.state.timerTicks) / config.refreshFrequencyInSeconds;

    return (
      <div style={style.main}>
        <div
          ref={(postsWrapper) => {this.postsWrapper = postsWrapper}}
          style={style.posts}
        >
          {postIds.map((postId) => this.renderPostWithId(postId, postId == lastPostId))}
        </div>
        <div style={style.bottomBar}>
          <div style={style.bottmBarItem}>
            <Line
              percent={progressLeftPercent}
              strokeWidth={7}
              strokeColor="#73AF00"
              trailWidth={0}
              trailColor="#333333"
            />
          </div>
          <div style={style.bottmBarItem}>
            {this.state.autoScroll && 'autoscroll'}
          </div>
        </div>
      </div>
    );
  }
}
