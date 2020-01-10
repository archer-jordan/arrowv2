import React from 'react';
// COMPONENTS
import Button from 'components/common/Button';
import Modal from 'components/common/Modal';

class OverrideModal extends React.PureComponent {
  render() {
    return (
      <Modal visible={this.props.visible} footer={null}>
        {this.props.content}
        <div style={{display: 'flex', marginTop: 20}}>
          {' '}
          <div style={{flex: 1}}></div>
          <div style={{flex: 1}}>
            {' '}
            <Button
              style={{width: 100}}
              secondary
              onClick={this.props.onCancel}
            >
              cancel
            </Button>
            <Button
              style={{width: 100, marginLeft: 16}}
              onClick={this.props.onUpdate}
            >
              Yes, update
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default OverrideModal;
