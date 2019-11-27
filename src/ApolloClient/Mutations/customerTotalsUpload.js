// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  mutation customerTotalsUpload($values: CustomerReportParams) {
    customerTotalsUpload(values: $values) {
      success
      errors
    }
  }
`;
