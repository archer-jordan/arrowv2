// TOP LEVEL IMPORTS
import gql from 'graphql-tag';

export default gql`
  query adminDocs($searchText: String, $sortBy: DocSortByEnum) {
    adminDocs(searchText: $searchText, sortBy: $sortBy) {
      id
      filename
      mimetype
      url
    }
  }
`;
