import React from 'react';
import Button from 'components/common/Button';
import ContactForm from './ContactForm';
import uid from 'uid-safe';
import helpers from 'lib/helpers/GeneralHelpers';

class Contacts extends React.PureComponent {
  state = {
    contacts: this.props.customer.contacts || [],
  };
  onAdd = () => {
    let id = uid.sync(18);
    this.setState({
      contacts: [...this.state.contacts, {id}],
    });
  };
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
    this.state.contacts.forEach(item => {
      if (newData.id === item.id) {
        contacts.push(newData);
      } else {
        contacts.push(item);
      }
    });

    this.props.onSaveChanges({
      contacts: helpers.cleanTypenameFromArray(contacts),
    });
  };
  render() {
    return (
      <div>
        {this.state.contacts.map(contact => (
          <ContactForm
            key={contact.id}
            onRemove={this.onRemove}
            onSaveContact={this.onSaveContact}
            contact={contact}
          />
        ))}
        <Button style={{width: 200}} onClick={this.onAdd}>
          Add New Contact
        </Button>
      </div>
    );
  }
}

export default Contacts;
