import React from "react";
import { Link } from "react-router-dom";
import AuthorsList from "../AuthorsList/AuthorsList";

const Article = ({ currentId, article, checked, handleChange }) => {
  const isMy = () => {
    return (
      article.authors.findIndex(({ authorId }) => authorId === currentId) >= 0
    );
  };

  return (
    <>
      {isMy() ? (
        <input
          type="checkbox"
          checked={checked}
          name={article._id}
          onChange={handleChange}
        />
      ) : null}
      <div>
        <Link
          to={`/articles/${article._id}`}
          style={{ fontWeight: isMy() ? "bold" : "normal" }}
        >
          {article.title}
        </Link>
        , {new Date(article.publicationDate).getFullYear()}
      </div>
      <AuthorsList authors={article.authors} className="articles_author" />
    </>
  );
};

export default Article;
