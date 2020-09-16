import {PARTNER_TYPE_OPTIONS} from 'components/inputs/PartnerTypeInput';

export default {
  cleanTypenameFromArray: (arrayValue) => {
    // given an array of objects, this will remove the __typename field
    // this is needed because most/all mutations will not accept values with __typename as a field
    return arrayValue.map((value) => {
      if (value && value.__typename) {
        delete value.__typename;
      }
      return value;
    });
  },
  capitalize: (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  },
  passwordCheck: (password, confirmPassword) => {
    // make sure password has been filled in
    if (!password) {
      return ['Please provide an password'];
    }
    // make sure password is at least 6 characters
    if (password.length < 6) {
      return [
        'Passwords should be at least 6 characters with at least one special character',
      ];
    }
    // make sure it includes a special character
    if (!password.match(/[_\W0-9]/)) {
      return ['Passwords should be include one special character'];
    }
    // make sure the confirmPassword input has been filled in
    if (!confirmPassword) {
      return ['Please confirm your password'];
    }
    //must contain at least one uppercase l
    if (!/[A-Z]/.test(password)) {
      return ['Passwords should be include one uppercase character'];
    }
    // check if password match
    if (confirmPassword !== password) {
      return ['Your passwords do not match'];
    }

    return null;
  },
  centsToDollars: (value) => {
    // given a dollar amount in cents, this will return dollars
    return (value / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  },
  mapPartnerTypeToLabel: (partnerType) => {
    // given a raw partnerType value (which is in camel case), this will return the human-readable label
    let item = PARTNER_TYPE_OPTIONS.filter(
      (item) => item.value === partnerType
    )[0];
    if (item) {
      return item.label;
    } else {
      return null;
    }
  },
  mapCompanyTypeToLabel: (companyType) => {
    // given a raw companyType value (which is in camel case), this will return the human-readable label
    if (!companyType) return '';
    switch (companyType) {
      case 'cCorp':
        return 'C-Corp';
      case 'sCorp':
        return 'S-Corp';
      case 'llc':
        return 'LLC';
      case 'llp':
        return 'LLP';
      case 'other':
        return 'Other';
      default:
        return '';
    }
  },
};
