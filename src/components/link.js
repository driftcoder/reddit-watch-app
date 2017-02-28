import _ from 'lodash';
import React from 'react';

export default class Link extends React.PureComponent {
  static propTypes = {
    href: React.PropTypes.string.isRequired,

    style: React.PropTypes.object,
    children: React.PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      style: {
        base: this.props.style,
        hover: _.merge({}, this.props.style, {textDecoration: 'underline'}),
      },
      hover: false,
    }

    this.onClickEvent = this.onClickEvent.bind(this);
  }

  onClickEvent(event) {
    event.preventDefault();
    electron.shell.openExternal(this.props.href)
  }

  render() {
    return (
      <a
        style={this.state.hover ? this.state.style.hover : this.state.style.base}
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
