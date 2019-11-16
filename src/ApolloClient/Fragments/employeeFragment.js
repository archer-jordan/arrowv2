// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  fragment employeeFragment on Employee {
    id
    firstName
    lastName
    email
    gender
    dob
    hireDate
    ssn
    street
    zip
    status
    state
    city
    assignedId
    assignedCompanyId
  }
`;