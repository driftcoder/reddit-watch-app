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
  },
};

export default class Image extends React.PureComponent {
  static propTypes = {
    showImages: React.PropTypes.bool.isRequired,
    bigImages: React.PropTypes.bool.isRequired,

    src: React.PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      showImages: props.showImages,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({showImages: nextProps.showImages});
  }

  render() {
    return this.state.showImages ? (
      <span
        style={_.merge({}, style.imageWrapper, !this.props.bigImages && style.mediumImageWrapper)}
        onMouseOut={() => !this.props.showImages && this.setState({showImages: false})}
      >
        <img style={style.image} src={this.props.src}/>
      </span>
    ) : (
      <i
        style={style.icon}
        className="fa fa-picture-o"
        onMouseOver={() => this.setState({showImages: true})}
      />
    );
  }
}
