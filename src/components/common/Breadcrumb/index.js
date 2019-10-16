import React from 'react';

class Breadcrumb extends React.PureComponent {
  render() {
    return (
      <div>
        {this.props.crumbs[0]} / {this.props.crumbs[1]}
      </div>
    );
  }
}

export default Breadcrumb;
