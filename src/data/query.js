import gql from "graphql-tag";

export const fetchRepositoriesGQLQuery = gql`
  query search($query: String!) {
    search(query: $query, type: REPOSITORY) {
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
`;

/*

DATA  => NEEDS

 * repo-name
 * avatar-image
 * owner-name
 * description
 * createdAt / updatedAt => (timestamp)
 * no of Issues in (k)
 * no of Stars in (k)
 
HOW DATA IS => COMMING

{
  "data": {
    "search": {
      "repositoryCount": 14858093,
      "edges": [
        {
          "node": {
            "name": "freeCodeCamp",
            "openGraphImageUrl": "https://avatars.githubusercontent.com/u/9892522?s=400&v=4",
            "owner": {
              "login": "freeCodeCamp",
              "name": "freeCodeCamp.org"
            },
            "description": "freeCodeCamp.org's open-source codebase and curriculum. Learn to code for free.",
            "stargazers": {
              "totalCount": 325579
            },
            "issues": {
              "totalCount": 15426
            },
            "primaryLanguage": {
              "name": "JavaScript"
            },
            "createdAt": "2014-12-24T17:49:19Z"
          }
        }
      ]
    }
  }
}

*/
