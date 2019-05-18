import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/auth";

const Articles = ({ articles }) => {
  const { user } = useContext(AuthContext);

  const isMyArticle = article => {
    if (!user) return false;
    return (
      article.authors.findIndex(({ authorId }) => authorId === user._id) >= 0
    );
  };

  return (
    <ol>
      {articles.map(el => {
        const authors = () => {
          if (!el.authors.length) return null;
          const result = [];
          el.authors.forEach(el => {
            let author = `${el.lastname} ${el.name}`;
            if (el.authorId)
              author = <Link to={`/authors/${el.authorId}`}>{author}</Link>;
            author = <li key={el._id}>{author}</li>;
            result.push(author);
          });
          return <ul>{result}</ul>;
        };
        return (
          <li key={el._id}>
            <div>
              <span style={{ fontWeight: isMyArticle(el) ? "bold" : "normal" }}>
                {el.title}
              </span>
              , {el.publicationDate}
              {authors()}
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default Articles;
