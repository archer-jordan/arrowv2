import React from 'react';
// COMPONENTS
import Icon from 'components/common/Icon';

class Downloading extends React.PureComponent {
  render() {
    if (!this.props.visible) return null;
    return (
      <div
        style={{
          position: 'fixed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          right: 0,
          left: 0,
          top: 0,
          bottom: 0,
          background: 'rgba(0,0,0,.25',
        }}
      >
        <div
          style={{
            background: '#fff',
            height: 200,
            width: 350,
            borderRadius: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{textAlign: 'center'}}>
            <Icon type="loading" style={{fontSize: 20, marginBottom: 24}} />
            <div>Downloading CSV...</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Downloading;
