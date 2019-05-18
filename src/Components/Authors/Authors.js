import React from "react";
import { Link } from "react-router-dom";

const Authors = ({ authors }) => {
  if (authors.length === 0) return <div> Авторов нет</div>;
  return (
    <ol>
      {authors.map(el => {
        let fullName = el.name;
        if (el.patronym) fullName += " " + el.patronym;
        fullName += " " + el.lastname;
        return (
          <li key={el._id}>
            <Link to={`/authors/${el._id}`}>{fullName}</Link>
          </li>
        );
      })}
    </ol>
  );
};

export default Authors;
