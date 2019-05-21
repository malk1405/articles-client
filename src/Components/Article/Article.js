import React from "react";
import { Link } from "react-router-dom";

const Article = ({ currentId, article, checked, index, handleChange }) => {
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
        <span>{index + 1}. </span>
        <Link
          to={`/articles/${article._id}`}
          style={{ fontWeight: isMy() ? "bold" : "normal" }}
        >
          {article.title}
        </Link>
        , {new Date(article.publicationDate).getFullYear()}
      </div>
      <ul>
        {article.authors.map(({ _id, authorId, name, lastname }) => {
          let author = `${name} ${lastname}`;
          if (authorId)
            author = <Link to={`/authors/${authorId}`}>{author}</Link>;
          return (
            <li className="articles_author" key={_id}>
              {author}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Article;
