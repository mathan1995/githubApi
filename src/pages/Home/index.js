import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import QUERY from "../../utils/query";
import { RepoCard, Loader } from "../../components";
import InfiniteScroll from "react-infinite-scroll-component";

const RepoList = () => {
  const first = 10;
  const query = "language:JavaScript";
  const [hasmore, setHasMore] = useState(true);

  // Handelling all queries
  const { loading, error, data, fetchMore, refetch } = useQuery(QUERY, {
    variables: { first, query },
    notifyOnNetworkStatusChange: true,
  });

  // function to fetchData -> fetchMore
  const fetchMoreRepos = () => {
    fetchMore({
      query: QUERY,
      variables: {
        first: 10,
        after: data.search.pageInfo.endCursor,
        query,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.search.edges;
        const pageInfo = fetchMoreResult.search.pageInfo;

        return newEdges.length
          ? {
              // Put the new comments at the end of the list and update `pageInfo`
              // so we have the new `endCursor` and `hasNextPage` values
              search: {
                ...previousResult.search,
                edges: [...previousResult.search.edges, ...newEdges],
                pageInfo,
              },
            }
          : previousResult;
      },
    });

    if (data.search.edges.length >= 40) {
      setHasMore(false);
    }
  };

  // returning requirements with components
  return (
    <>
      {!data && loading ? (
        <Loader
          size={100}
          thickness={31}
          speed={100}
          color="black"
          secondaryColor="#ddd"
        />
      ) : error ? (
        <p>Network Error or in downline 🚀 :)</p>
      ) : (
        <>
          {/* <div>Got {data.search.edges.length}</div> */}

          <InfiniteScroll
            dataLength={data.search.edges.length} //This is important field to render the next data (checking length concerns)
            next={fetchMoreRepos}
            hasMore={hasmore}
            loader={<p>Loading...</p>}
            endMessage={
              <p className="end__cursor">
                Yay! You have seen all the 50 most stared Repositories 🚀 :){" "}
              </p>
            }
            // below props only if you need pull down functionality
            refreshFunction={refetch}
            pullDownToRefresh
            pullDownToRefreshThreshold={500}
            pullDownToRefreshContent={<h3>&#8595; Pull down to refresh</h3>}
            releaseToRefreshContent={<h3>&#8593; Release to refresh</h3>}
          >
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
          </InfiniteScroll>
        </>
      )}
    </>
  );
};

export default RepoList;
