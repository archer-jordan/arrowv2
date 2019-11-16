// TOP LEVEL IMPORTS
import gql from 'graphql-tag';
import employeeFragment from 'ApolloClient/Fragments/employeeFragment';

export default gql`
  mutation saveEmployee($id: ID, $params: EmployeeParams) {
    saveEmployee(id: $id, params: $params) {
      ...employeeFragment
    }
  }
  ${employeeFragment}
`;
