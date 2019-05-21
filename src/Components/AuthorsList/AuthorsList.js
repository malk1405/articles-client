import React from "react";
import { Link } from "react-router-dom";

const AuthorsList = ({ authors, className }) => {
  if (!Array.isArray(authors)) return null;

  return (
    <ul className={className}>
      {authors.map(({ _id, authorId, name, lastname }) => {
        let author = `${name} ${lastname}`;
        if (authorId)
          author = <Link to={`/authors/${authorId}`}>{author}</Link>;
        return <li key={_id}>{author}</li>;
      })}
    </ul>
  );
};

export default AuthorsList;
