import moment from 'moment';
import {validate} from 'email-validator';

export default {
  formatRow: row => {
    // grab the keys of the object
    let keys = Object.keys(row);

    let cleanedRow = {};
    // for each key, we want to trim it and add it as a key value pair to cleanedRow
    keys.forEach(key => {
      cleanedRow[key.trim()] = row[key];
    });
    // console.log({
    //   row,
    //   keys,
    //   cleanedRow,
    //   cleanedKeys: Object.keys(cleanedRow),
    // });
    return {
      firstName: cleanedRow['First Name'],
      lastName: cleanedRow['Last Name'],
      email: cleanedRow['E-Mail'],
      assignedId: cleanedRow['EAID'],
      assignedCustomerId: cleanedRow['COID'],
      gender: cleanedRow['Gender'] === 'M' ? 'male' : 'female',
      hireDate: moment(cleanedRow['Hire Date YYYYMMDD'], 'YYYYMMDD')
        .valueOf()
        .toString(),
      dob: moment(cleanedRow['Birth Date YYYYMMDD'], 'YYYYMMDD')
        .valueOf()
        .toString(),
      street: cleanedRow['Address'],
      zip: cleanedRow['Zip Code'],
      state: cleanedRow['State'],
      ssn: cleanedRow['SSN/Fed ID'],
      city: cleanedRow['City'],
      status: cleanedRow['Status'] && cleanedRow['Status'].toLowerCase(),
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
    console.log({results});
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
