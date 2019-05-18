import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/auth";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router-dom";

const ArticlesContainer = ({ location: { pathname } }) => {
  const [errorText, setErrorText] = useState("");
  const [articles, setArticles] = useState([]);
  const context = useContext(AuthContext);
  const id = pathname.split("/")[2];

  const handleDelete = ({ target: { name } }) => {
    setDeletedData({ id: name });
    setIsDeleting(true);
  };
  const {
    isFetching: isLoading,
    setUrl: setLoadUrl,
    setIsFetching: setIsLoading
  } = useAxios({
    onSuccess: ({ data }) => {
      setArticles(data);
    },
    onFailure: setErrorText
  });

  const {
    isFetching: isDeleting,
    setData: setDeletedData,
    setIsFetching: setIsDeleting
  } = useAxios({
    url: `/api/articles/`,
    method: "delete",
    onSuccess: () => {
      setIsLoading(true);
    },
    onFailure: setErrorText
  });

  useEffect(
    () => {
      let url = `/api/articles/`;
      if (id) url += `?author=${id}`;
      setLoadUrl(url);
      setIsLoading(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  if (isLoading | isDeleting) return <p>Загружаю...</p>;
  if (errorText) return <p>{errorText}</p>;
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

export default ArticlesContainer;
