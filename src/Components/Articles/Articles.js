import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/auth";
import useAxios from "../../hooks/useAxios";

const Main = ({ location: { pathname } }) => {
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
        return (
          <li key={el._id}>
            <div>
              {el.title} {el.publicationDate}{" "}
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
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Main;
