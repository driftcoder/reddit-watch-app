import React from 'react';

import config from 'config/config.js';

const style = {
  image: {
    width: '100%',
    maxWidth: config.maxImageWidth,
  },
  icon: {
    fontSize: '18px',
  }
};

export default class Image extends React.PureComponent {
  static propTypes = {
    src: React.PropTypes.string.isRequired,
    collapsed: React.PropTypes.bool,
  }

  render() {
    return this.props.collapsed ?
      <i style={style.icon} className="fa fa-picture-o"/> :
      <img style={style.image} src={this.props.src}/>;
  }
}
