import React from 'react';

export default class Link extends React.PureComponent {
  static propTypes = {
    onClick: React.PropTypes.func.isRequired,

    children: React.PropTypes.string.isRequired,
    style: React.PropTypes.object,
    hoverStyle: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      style: props.style,
    }
  }

  render() {
    return (
      <span
        style={this.state.style}
        onClick={() => this.props.onClick}
        onMouseOver={() => this.setState({style: this.props.hoverStyle})}
        onMouseOut={() => this.setState({style: this.props.style})}
      >
        {this.props.children}
      </span>
    );
  }
}
