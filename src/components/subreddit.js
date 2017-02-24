import _ from 'lodash';
import Howler from 'howler';
import React from 'react';
import scrollTo from 'scroll-to'

import config from 'config/config.js';
import Post from 'components/post.js';

const style = {
  main: {
    fontFamily: 'AppFont',
    fontSize: '14px',
    color: '#999999',
    padding: '5px',
  },
  post: {
    marginBottom: '15px',
  },
  lastPost: {
    marginBottom: '25px',
  },
  bottomBar: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    height: '20px',
    lineHeight: '20px',
    backgroundColor: '#111111',
    borderTop: '1px solid #999999',
    padding: '0 5px',
  },
  bottmBarItem: {
    display: 'inline-block',
    width: '120px',
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
      newPost: false,
    }
    this.timerTickEvent = this.timerTickEvent.bind(this);
    this.scrollEvent = this.scrollEvent.bind(this);
  }

  componentWillMount() {
    this.props.fetchNewPostsInSubreddit(this.props.id);
    setInterval(this.timerTickEvent, 1000);
    window.addEventListener('scroll', _.throttle(this.scrollEvent, 100));
  }

  componentWillReceiveProps(nextProps) {
    const lastPostId = _.last(nextProps.data.postsByDate).id;

    if (this.state.lastPostId != lastPostId) {
      this.setState({
        lastPostId,
        newPost: true,
      });
    }
  }

  componentDidUpdate() {
    if (this.state.newPost) {
      this.setState({
        newPost: false,
      }, () => {
        setTimeout(() => {
          // We need to delay this to get correct conteiner height
          console.log(document.body.scrollHeight - window.innerHeight);
          notificationSound.play();
          this.state.autoScroll && scrollTo(
            0,
            document.body.scrollHeight - window.innerHeight
          );
        }, 500);
      });
    }
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
    const autoScroll = (window.innerHeight + window.scrollY) >= document.body.scrollHeight;

    this.setState({autoScroll});
  }

  renderPostWithId(postId, last) {
    const postStyle = last ? style.lastPost : style.post;

    return(
      <div key={postId} style={postStyle}>
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
        {postIds.map((postId) => this.renderPostWithId(postId, postId == lastPostId))}
        <div style={style.bottomBar}>
          <span style={style.bottmBarItem}>
            Update in: {config.refreshFrequencyInSeconds - this.state.timerTicks}
          </span>
          <span style={style.bottmBarItem}>
            {this.state.autoScroll && 'autoscroll'}
          </span>
        </div>
      </div>
    );
  }
}
