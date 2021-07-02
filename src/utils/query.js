import { gql } from "@apollo/client";

const QUERY = gql`
  {
    search(query: "language:JavaScript", type: REPOSITORY, first: 50) {
      repositoryCount
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
            stargazers {
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
