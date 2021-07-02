import React from "react";
import { useQuery } from "@apollo/client";
import QUERY from "../../utils/query";
import { RepoCard } from "../../components";

const RepoList = () => {
  // Handelling all queries
  const { loading, error, data } = useQuery(QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Network Error :(</p>;
  return (
    <>
      <h2>50 Repositories with Max Stars 🚀</h2>
      {data.search &&
        data.search.edges.map(({ node }) => (
          <RepoCard
            key={node.id}
            name={node.name}
            description={node.description}
            image={node.openGraphImageUrl}
            totalIssues={node.issues.totalCount}
            totalStars={node.stargazers.totalCount}
            lastModified={node.updatedAt}
            ownerName={node.owner.name}
          />
        ))}
    </>
  );
};

export default RepoList;