// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  fragment customerFragment on Customer {
    id
    title
    ein
    companyType
    naics
    sic
    status
    # location
    street
    zip
    state
    city
  }
`;
