import dateformat from 'dateformat';
import marked from 'marked';
import React from 'react';

import config from 'config/config.js';
import Hoverable from 'components/hoverable.js';

const style = {
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
    marginLeft: '10px',
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
};

export default class Post extends React.PureComponent {
  static propTypes = {
    post: React.PropTypes.object.isRequired,
    revisions: React.PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.state = {
      titleStyle: style.title,
    }
  }

  renderImage(src) {
    return (
      <img style={style.image} src={src}/>
    );
  }

  render() {
    return (
      <div>
        <div>
          <span onClick={() => electron.shell.openExternal(this.props.post.permalink)}>
            <Hoverable style={style.title} hoverStyle={style.titleHover}>
              {this.props.post.title}
            </Hoverable>
          </span>
        </div>
        <div>
          <span style={style.date}>{dateformat(this.props.post.date * 1000, 'h:MM:ss TT')}</span>
          <span style={style.category}>{this.props.post.category}</span>
        </div>
        {this.props.post.url && (
          <div>
            <span onClick={() => electron.shell.openExternal(this.props.post.url)}>
              <Hoverable style={style.link} hoverStyle={style.linkHover}>
                {this.props.post.url}
              </Hoverable>
            </span>
          </div>
        )}
        {this.props.post.images.map(this.renderImage)}
        <div>{this.props.post.body}</div>
      </div>
    );
  }
}
