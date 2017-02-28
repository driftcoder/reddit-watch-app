import React from 'react';

import Link from 'components/link.js';

const style = {
  color: '#73AF00',
  textDecoration: 'none',
};

export default class Title extends React.PureComponent {
  static propTypes = {
    href: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
  }

  render() {
    return (
      <Link href={this.props.href} style={style}>
        {this.props.text}
      </Link>
    );
  }
}
