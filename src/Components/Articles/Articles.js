import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/auth";

const Articles = ({ articles, handleDelete, id }) => {
  const context = useContext(AuthContext);
  return (
    <ul>
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
              {`"${el.title}", ${el.publicationDate}`}{" "}
              {context.user && context.user._id === id ? (
                <button
                  name={el._id}
                  style={{
                    backgroundColor: "#c95991",
                    borderRadius: "50%",
                    border: "none",
                    color: "white"
                  }}
                  onClick={handleDelete}
                >
                  -
                </button>
              ) : null}
              {authors()}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Articles;
