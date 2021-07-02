import React from "react";
import { useQuery } from "@apollo/client";
import QUERY from "../../utils/query";
import { RepoCard, Loader } from "../../components";

const RepoList = () => {
  // Handelling all queries
  const { loading, error, data } = useQuery(QUERY);

  // If data plate is -> loading..
  if (loading)
    return (
      <Loader
        size={100}
        thickness={31}
        speed={100}
        color="black"
        secondaryColor="#ddd"
      />
    );

  // If Netowk plate is -> Error..
  if (error) return <p>Network Error 🚀 :)</p>;

  // returning requirements with components
  return (
    <>
      <h2>50 Repositories with Max Stars 🚀</h2>
      {data.search &&
        data.search.edges.map(({ node }) => (
          <RepoCard
            url={node.owner.url}
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
