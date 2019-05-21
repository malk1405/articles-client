import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const ArticlesContainer = ({ location: { pathname } }) => {
  const [errorText, setErrorText] = useState("");
  const [articles, setArticles] = useState([]);
  const id = pathname.split("/")[2];
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

  useEffect(
    () => {
      let url = `/api${pathname}`;
      setLoadUrl(url);
      setIsLoading(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );
  return <p> Статья </p>;
};

export default ArticlesContainer;
