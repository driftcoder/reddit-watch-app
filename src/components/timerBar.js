import React from 'react';

const timerBarRefilTimeInSeconds = 0.5;
const style = {
  shadow: {
    margin: '7px 0 0',
    height: '7px',
    width: '100px',
    backgroundColor: '#333333',
    borderRadius: '4px',
  },
  full: {
    position: 'absolute',
    top: '7px',
    height: '7px',
    width: '100px',
    backgroundColor: '#73AF00',
    borderRadius: '4px',
    transition: 'width ' + timerBarRefilTimeInSeconds + 's linear',
  },
  running: {
    width: '8px',
    transition: 'width [time]s linear',
  },
};

export default class TimerBar extends React.PureComponent {
  static propTypes = {
    time: React.PropTypes.number.isRequired,
    startRef: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
    this.timerBarRefEvent = this.timerBarRefEvent.bind(this);
  }

  start() {
    this.timerBar.style.transition = style.full.transition;
    this.timerBar.style.width = style.full.width;
    setTimeout(() => {
      this.timerBar.style.transition = style.running.transition.replace('[time]', this.props.time);
      this.timerBar.style.width = style.running.width;
    }, timerBarRefilTimeInSeconds * 1000);
  }

  timerBarRefEvent(timerBar) {
    this.timerBar = timerBar;
    this.props.startRef(this.start);
  }

  render() {
    return (
      <div>
        <div style={style.shadow}/>
        <div ref={this.timerBarRefEvent} style={style.full}/>
      </div>
    );
  }
}
