export default {
  cleanTypenameFromArray: arrayValue => {
    return arrayValue.map(value => {
      if (value && value.__typename) {
        delete value.__typename;
      }
      return value;
    });
  },
};
