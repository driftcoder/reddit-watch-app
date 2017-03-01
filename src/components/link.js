import _ from 'lodash';
import React from 'react';

const style = {
  color: '#CA6400',
  textDecoration: 'none',
};

export default class Link extends React.PureComponent {
  static propTypes = {
    href: React.PropTypes.string.isRequired,
    children: React.PropTypes.string.isRequired,

    color: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };

    this.onClickEvent = this.onClickEvent.bind(this);
  }

  onClickEvent(event) {
    event.preventDefault();
    electron.shell.openExternal(this.props.href);
  }

  render() {
    const currentStyle = _.merge(
      {},
      style,
      this.props.color ? {color: this.props.color} : {},
      this.state.hover ? {textDecoration: 'underline'} : {}
    );

    return (
      <a
        style={currentStyle}
        onClick={this.onClickEvent}
        onMouseOver={() => this.setState({hover: true})}
        onMouseOut={() => this.setState({hover: false})}
        href={this.props.href}
      >
        {this.props.children}
      </a>
    );
  }
}
