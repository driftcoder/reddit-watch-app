import _ from 'lodash';
import React from 'react';

import config from 'config/config.js';

const style = {
  imageWrapper: {
    display: 'inline-block',
  },
  mediumImageWrapper: {
    maxWidth: config.mediumImageWidth,
  },
  image: {
    maxWidth: '100%',
  },
  icon: {
    fontSize: '18px',
  }
};

export default class Image extends React.PureComponent {
  static propTypes = {
    imagesShown: React.PropTypes.bool.isRequired,
    bigImagesShown: React.PropTypes.bool.isRequired,

    src: React.PropTypes.string.isRequired,
  }

  render() {
    return this.props.imagesShown ?
      (
        <span style={_.merge({}, style.imageWrapper, !this.props.bigImagesShown && style.mediumImageWrapper)}>
          <img style={style.image} src={this.props.src}/>
        </span>
      ) :
      <i style={style.icon} className="fa fa-picture-o"/>;
  }
}
