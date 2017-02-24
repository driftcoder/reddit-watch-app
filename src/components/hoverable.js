import React from 'react';

export default class Hoverable extends React.PureComponent {
  static propTypes = {
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
        onMouseOver={() => this.setState({style: this.props.hoverStyle})}
        onMouseOut={() => this.setState({style: this.props.style})}
      >
        {this.props.children}
      </span>
    );
  }
}
