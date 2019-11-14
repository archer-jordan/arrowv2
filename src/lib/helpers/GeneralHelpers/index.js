export default {
  cleanTypenameFromArray: arrayValue => {
    return arrayValue.map(value => {
      if (value && value.__typename) {
        delete value.__typename;
      }
      return value;
    });
  },
  mapCompanyTypeToLabel: companyType => {
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
