import moment from 'moment';
import {validate} from 'email-validator';

export default {
  formatRow: row => {
    return {
      firstName: row['First Name'],
      lastName: row['Last Name'],
      email: row['E-Mail'],
      assignedId: row['EAID'],
      assignedCustomerId: row['COID'],
      gender: row['Gender'] === 'M' ? 'male' : 'female',
      hireDate: moment(row['Hire Date YYYYMMDD'], 'YYYYMMDD')
        .valueOf()
        .toString(),
      dob: moment(row['Birth Date YYYYMMDD'], 'YYYYMMDD')
        .valueOf()
        .toString(),
      street: row['Address'],
      zip: row['Zip Code'],
      state: row['State'],
      ssn: row['SSN/Fed ID'],
      city: row['City'],
      status: row['Status'],
    };
  },
  checkForDuplicateIDs: formattedData => {
    let allIds = formattedData.map(item => item.assignedId);
    const checkIfArrayIsUnique = myArray => {
      return myArray.length === new Set(myArray).size;
    };
    // check for duplicates
    return checkIfArrayIsUnique(allIds);
  },
  getInvalidFields: results => {
    let invalidFields = [];
    results.data.forEach((item, i) => {
      if (
        !item['EAID'] ||
        item['EAID'] === '' ||
        item['EAID'] === 'NULL' ||
        item['EAID'] === ' '
      ) {
        invalidFields.push(`EAID does not exist for ${i + 1}`);
      }
    });
    return invalidFields;
  },
  /**
   * getInvalidEmails takes in the parsed result and will check for invalid emails each row
   */
  getInvalidEmails: results => {
    let invalidEmails = [];
    results.data.forEach((item, i) => {
      let email = item['E-Mail'];
      if (item['EAID']) {
        if (!email) {
          invalidEmails.push(`Email does not exist for row ${i + 1}`);
        }
        if (email && !validate(email)) {
          invalidEmails.push(`Email is invalid for row ${i + 1}: ${email}`);
        }
      }
    });
    return invalidEmails;
  },
};
