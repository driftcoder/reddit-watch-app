import _ from 'lodash';
import React from 'react';

import TimerBar from 'components/timerBar.js';

const style = {
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '20px',
    borderTop: '1px solid #999999',
    padding: '0 5px',
  },
  item: {
    display: 'inline-block',
    height: '20px',
    lineHeight: '20px',
    marginRight: '10px',
    float: 'left',
  },
  option: {
    float: 'right',
    cursor: 'pointer',
  },
  off: {
    color: '#333333',
  },
};

export default class BottomBar extends React.PureComponent {
  static propTypes = {
    hideImages: React.PropTypes.func.isRequired,
    showImages: React.PropTypes.func.isRequired,
    showBigImages: React.PropTypes.func.isRequired,
    imagesShown: React.PropTypes.bool.isRequired,
    bigImagesShown: React.PropTypes.bool.isRequired,

    startTimerRef: React.PropTypes.func.isRequired,
    time: React.PropTypes.number.isRequired,

    autoScroll: React.PropTypes.bool,
    error: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.showImagesClickEvent = this.showImagesClickEvent.bind(this);
    this.bigImagesClickEvent = this.bigImagesClickEvent.bind(this);
  }

  showImagesClickEvent() {
    this.props.imagesShown ? this.props.hideImages() : this.props.showImages();
  }

  bigImagesClickEvent() {
    this.props.bigImagesShown ? this.props.showImages() : this.props.showBigImages();
  }

  render() {
    return (
      <div style={style.wrapper}>
        <div style={style.item}>
          <TimerBar startRef={this.props.startTimerRef} time={this.props.time}/>
        </div>
        <div style={_.merge({}, style.item, !this.props.autoScroll && style.off)}>
          <i className="fa fa-arrow-circle-down"/>
        </div>
        {this.props.error && (
          <div style={style.item}>
            {this.props.error}
          </div>
        )}
        <div style={_.merge({}, style.item, style.option, !this.props.bigImagesShown && style.off)}>
          <i className="fa fa-plus-square" onClick={this.bigImagesClickEvent}/>
        </div>
        <div style={_.merge({}, style.item, style.option, !this.props.imagesShown && style.off)}>
          <i className="fa fa-picture-o" onClick={this.showImagesClickEvent}/>
        </div>
      </div>
    );
  }
}
