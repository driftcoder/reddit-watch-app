import dateformat from 'dateformat';
import marked from 'marked';
import React from 'react';

import config from 'config/config.js';
import Link from 'components/link.js';

const style = {
  post: {
    overflowWrap: 'break-word',
  },
  title: {
    color: '#73AF00',
    cursor: 'pointer',
  },
  titleHover: {
    color: '#73AF00',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  date: {
    color: '#C6003F',
  },
  category: {
    color: '#33A6BC',
    marginLeft: '20px',
  },
  postMeta: {
    marginLeft: '20px',
  },
  link: {
    color: '#CA6400',
    cursor: 'pointer',
  },
  linkHover: {
    color: '#CA6400',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  image: {
    maxWidth: config.maxImageWidth,
  },
  bigIcon: {
    fontSize: '18px',
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
    this.state = {
      titleStyle: style.title,
    }
  }

  renderImage(src, index) {
    return (
      <img key={index} style={style.image} src={src}/>
    );
  }

  render() {
    return (
      <div style={style.post}>
        <div>
          <Link
            onClick={() => electron.shell.openExternal(this.props.post.permalink)}
            style={style.title}
            hoverStyle={style.titleHover}
          >
            {this.props.post.title}
          </Link>
        </div>
        <div>
          <span style={style.date}>{dateformat(this.props.post.date * 1000, 'h:MM:ss TT')}</span>
          {this.props.post.category && (<span style={style.category}>{this.props.post.category}</span>)}
          <span style={style.postMeta}><i className="fa fa-comment-o"/> {this.props.post.commentsCount}</span>
          <span style={style.postMeta}><i className="fa fa-thumbs-o-up"/> {this.props.post.upVotes}</span>
          <span style={style.postMeta}><i className="fa fa-thumbs-o-down"/> {this.props.post.downVotes}</span>
          {this.props.revisions.length > 0 && (
            <span style={style.postMeta}><i className="fa fa-version"/> {this.props.revisions.length}</span>
          )}
        </div>
        {this.props.post.url && (
          <div>
            <Link
              onClick={() => electron.shell.openExternal(this.props.post.url)}
              style={style.link}
              hoverStyle={style.linkHover}
            >
              {this.props.post.url}
            </Link>
          </div>
        )}
        {this.props.post.images.length > 0 && this.props.showImages && (
          <div>{this.props.post.images.map(this.renderImage)}</div>
        )}
        {this.props.post.images.length > 0 && !this.props.showImages && (
          <div><i style={style.bigIcon} className="fa fa-picture-o"/></div>
        )}
        <div>{this.props.post.body}</div>
      </div>
    );
  }
}
