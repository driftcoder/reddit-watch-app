import React from 'react';

import Link from 'components/link.js';

export default class Title extends React.PureComponent {
  static propTypes = {
    href: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
  }

  render() {
    return (
      <Link href={this.props.href} color="#73AF00">
        {this.props.text}
      </Link>
    );
  }
}
