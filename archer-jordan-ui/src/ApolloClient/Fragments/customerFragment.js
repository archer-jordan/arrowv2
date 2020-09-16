// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  fragment customerFragment on Customer {
    id
    title
    ein
    assignedId
    companyType
    naics
    sic
    status
    referralPartnerId
    # location
    street
    zip
    state
    city
  }
`;
