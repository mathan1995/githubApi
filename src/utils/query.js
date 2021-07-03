import { gql } from "@apollo/client";

const QUERY = gql`
  query PageQuery($first: Int!, $after: String, $query: String!) {
    search(first: $first, after: $after, query: $query, type: REPOSITORY)
      @connection(key: "search", filter: ["query"]) {
      edges {
        node {
          ... on Repository {
            name
            id
            openGraphImageUrl
            owner {
              login
              ... on Organization {
                name
                url
              }
            }
            description
            stargazers(orderBy: { field: STARRED_AT, direction: DESC }) {
              totalCount
            }
            issues {
              totalCount
            }
            primaryLanguage {
              name
            }
            updatedAt
          }
        }
      }
      repositoryCount
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export default QUERY;

/*
 {
      search(query: "language:JavaScript", type: REPOSITORY, first: 10) {
        repositoryCount
        edges {
          node {
            ... on Repository {
              name
              openGraphImageUrl
              owner {
                login
                ... on Organization {
                  name
                }
              }
              description
              stargazers {
                totalCount
              }
              issues {
                totalCount
              }
              primaryLanguage {
                name
              }
              createdAt
            }
          }
        }
      }
    }
  `
*/
