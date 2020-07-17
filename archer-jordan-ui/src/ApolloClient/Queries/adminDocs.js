// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  query adminDocs($searchText: String) {
    adminDocs(searchText: $searchText) {
      id
      filename
      mimetype
      url
    }
  }
`;
