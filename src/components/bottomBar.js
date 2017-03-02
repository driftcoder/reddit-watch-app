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
    setShowImages: React.PropTypes.func.isRequired,
    setBigImages: React.PropTypes.func.isRequired,
    showImages: React.PropTypes.bool.isRequired,
    bigImages: React.PropTypes.bool.isRequired,
    autoscroll: React.PropTypes.bool.isRequired,

    startTimerRef: React.PropTypes.func.isRequired,
    time: React.PropTypes.number.isRequired,

    error: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.showImagesClickEvent = this.showImagesClickEvent.bind(this);
    this.bigImagesClickEvent = this.bigImagesClickEvent.bind(this);
  }

  showImagesClickEvent() {
    this.props.setShowImages(!this.props.showImages);
  }

  bigImagesClickEvent() {
    this.props.setBigImages(!this.props.bigImages);
  }

  render() {
    return (
      <div style={style.wrapper}>
        <div style={style.item}>
          <TimerBar startRef={this.props.startTimerRef} time={this.props.time}/>
        </div>
        <div style={_.merge({}, style.item, !this.props.autoscroll && style.off)}>
          <i className="fa fa-arrow-circle-down"/>
        </div>
        {this.props.error && (
          <div style={style.item}>
            {this.props.error}
          </div>
        )}
        <div style={_.merge({}, style.item, style.option, !this.props.bigImages && style.off)}>
          <i className="fa fa-plus-square" onClick={this.bigImagesClickEvent}/>
        </div>
        <div style={_.merge({}, style.item, style.option, !this.props.showImages && style.off)}>
          <i className="fa fa-picture-o" onClick={this.showImagesClickEvent}/>
        </div>
      </div>
    );
  }
}
