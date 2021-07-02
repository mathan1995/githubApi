import React from "react";
import moment from "moment";
import { AiOutlineIssuesClose, AiOutlineStar } from "react-icons/ai";
const RepoList = ({
  key,
  name,
  description,
  image,
  totalIssues,
  totalStars,
  lastModified,
  ownerName,
}) => {
  // Function for Formatting Number in K's => 10000 -> 10K
  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };

  return (
    <li className="card" key={key}>
      <div
        href="/"
        className="featured-image"
        style={{ backgroundImage: `url(${image})` }}
      />
      <article className="card-body">
        <header>
          <span className="pre-heading">{name}</span>
          <div className="title">
            <h5>{description}</h5>
          </div>
        </header>
        <div className="chips">
          <span className="chip">
            <AiOutlineStar /> {kFormatter(totalStars)}
          </span>
          <span className="chip">
            <AiOutlineIssuesClose /> {kFormatter(totalIssues)}
          </span>
          <span className="chip">
            Submited {moment(lastModified).fromNow()} by {ownerName}
          </span>
        </div>
      </article>
    </li>
  );
};

export default RepoList;
