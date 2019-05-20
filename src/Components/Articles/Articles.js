import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/auth";
import "./articles.css";

const Articles = ({ articles }) => {
  const { user } = useContext(AuthContext);

  const isMyArticle = article => {
    if (!user) return false;
    return (
      article.authors.findIndex(({ authorId }) => authorId === user._id) >= 0
    );
  };

  return (
    <ol className="articles">
      {articles.map((el, index) => {
        const authors = () => {
          if (!el.authors.length) return null;
          const result = [];
          el.authors.forEach(el => {
            let author = `${el.lastname} ${el.name}`;
            if (el.authorId)
              author = <Link to={`/authors/${el.authorId}`}>{author}</Link>;
            author = (
              <li className="articles_author" key={el._id}>
                {author}
              </li>
            );
            result.push(author);
          });
          return <ul>{result}</ul>;
        };
        return (
          <li
            className="article"
            onClick={() => {
              console.log("VITALINA");
            }}
            key={el._id}
          >
            <div>
              <span>{index + 1}. </span>
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
