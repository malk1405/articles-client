import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import Articles from "../../Components/Articles/Articles";

const ArticlesContainer = ({ location: { pathname } }) => {
  const [errorText, setErrorText] = useState("");
  const [articles, setArticles] = useState([]);
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
  return <Articles articles={articles} handleDelete={handleDelete} id={id} />;
};

export default ArticlesContainer;
