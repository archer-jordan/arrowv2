import React from 'react';
import Button from 'components/common/Button';
import ContactForm from './ContactForm';
import ContactsTable from './ContactsTable';
import uid from 'uid-safe';
import helpers from 'lib/helpers/GeneralHelpers';

class Contacts extends React.PureComponent {
  state = {
    contacts: this.props.customer.contacts || [],
  };
  componentWillReceiveProps(newProps) {
    if (newProps.customer.contacts !== this.props.customer.contacts) {
      this.setState({
        contacts: newProps.customer.contacts,
      });
    }
  }
  onRemove = id => {
    let newContacts = this.state.contacts.filter(item => item.id !== id);
    this.setState({
      contacts: newContacts,
    });
    this.props.onSaveChanges({
      contacts: helpers.cleanTypenameFromArray(newContacts),
    });
  };
  onSaveContact = newData => {
    let contacts = [];

    let existingIds = this.state.contacts.map(item => item.id);
    if (newData && newData.id && existingIds.includes(newData.id)) {
      this.state.contacts.forEach(item => {
        if (newData.id === item.id) {
          contacts.push(newData);
        } else {
          contacts.push(item);
        }
      });
    } else {
      contacts = [...this.state.contacts, newData];
    }

    this.props.onSaveChanges({
      contacts: helpers.cleanTypenameFromArray(contacts),
    });
    this.setState({
      editContact: null,
      addNew: false,
    });
  };
  render() {
    return (
      <div>
        {!this.state.editContact && !this.state.addNew && (
          <React.Fragment>
            <Button
              style={{width: 200, marginBottom: 16}}
              onClick={() => this.setState({addNew: true})}
            >
              Add New Contact
            </Button>
            <ContactsTable
              dataSource={this.state.contacts}
              onRemove={this.onRemove}
              onClick={item => this.setState({editContact: item})}
            />
          </React.Fragment>
        )}
        {this.state.editContact && (
          <ContactForm
            onSaveContact={this.onSaveContact}
            onCancel={() => this.setState({editContact: null})}
            contact={this.state.editContact}
          />
        )}
        {this.state.addNew && (
          <ContactForm
            onSaveContact={this.onSaveContact}
            onCancel={() => this.setState({addNew: null})}
          />
        )}
      </div>
    );
  }
}

export default Contacts;
