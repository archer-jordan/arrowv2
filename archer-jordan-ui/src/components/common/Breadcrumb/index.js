import React from 'react';

class Breadcrumb extends React.PureComponent {
  render() {
    return (
      <div>
        {this.props.crumbs[0]} / {this.props.crumbs[1]}{' '}
        {this.props.crumbs[2] && `/ ${this.props.crumbs[2]}`}
      </div>
    );
  }
}

export default Breadcrumb;
