import React from 'react';

export default class Link extends React.PureComponent {
  static propTypes = {
    href: React.PropTypes.string.isRequired,

    style: React.PropTypes.object,
    hoverStyle: React.PropTypes.object,
    children: React.PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      style: props.style,
    }

    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();
    electron.shell.openExternal(this.props.href)
  }

  render() {
    return (
      <a
        style={this.state.style}
        onClick={this.onClick}
        onMouseOver={() => this.setState({style: this.props.hoverStyle})}
        onMouseOut={() => this.setState({style: this.props.style})}
        href={this.props.href}
      >
        {this.props.children}
      </a>
    );
  }
}
