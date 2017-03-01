import dateformat from 'dateformat';
import marked from 'marked';
import React from 'react';

import Link from 'components/link.js';
import Image from 'components/post/image.js';
import Title from 'components/post/title.js';

const style = {
  post: {
    overflowWrap: 'break-word',
  },
  date: {
    color: '#C6003F',
  },
  leftGap: {
    marginLeft: '20px',
  },
  category: {
    color: '#33A6BC',
  },
};

export default class Post extends React.PureComponent {
  static propTypes = {
    post: React.PropTypes.object.isRequired,
    revisions: React.PropTypes.array,
    showImages: React.PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.renderImage = this.renderImage.bind(this);
  }

  renderImage(src, index) {
    return (
      <Image key={index} src={src} collapsed={!this.props.showImages}/>
    );
  }

  render() {
    return (
      <div style={style.post}>
        <div>
          <Title href={this.props.post.permalink} text={this.props.post.title}/>
        </div>
        <div>
          <span style={style.date}>{dateformat(this.props.post.date * 1000, 'h:MM:ss TT')}</span>
          {this.props.post.category && (
            <span style={_.merge({}, style.leftGap, style.category)}>{this.props.post.category}</span>
          )}
          <span style={style.leftGap}><i className="fa fa-comment-o"/> {this.props.post.commentsCount}</span>
          <span style={style.leftGap}><i className="fa fa-thumbs-o-up"/> {this.props.post.upVotes}</span>
          <span style={style.leftGap}><i className="fa fa-thumbs-o-down"/> {this.props.post.downVotes}</span>
          {this.props.revisions.length > 0 && (
            <span style={style.leftGap}><i className="fa fa-code-fork"/> {this.props.revisions.length}</span>
          )}
        </div>
        {this.props.post.url && (
          <div><Link href={this.props.post.url}>{this.props.post.url}</Link></div>
        )}
        {this.props.post.images.length > 0 && (
          <div>{this.props.post.images.map(this.renderImage)}</div>
        )}
        <div>{this.props.post.body}</div>
      </div>
    );
  }
}
