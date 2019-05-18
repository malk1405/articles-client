import React, { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import Authors from "../../Components/Authors/Authors";

const AuthorsContainer = ({ location: { pathname, search } }) => {
  const [authors, setAuthors] = useState([]);
  const [errorText, setErrorText] = useState("");

  const { isFetching, setIsFetching, setUrl } = useAxios({
    isFetching: true,
    url: `/api/authors/${search}`,
    onSuccess: responce => {
      if (responce) setAuthors(responce.data);
    },
    onFailure: setErrorText
  });

  useEffect(
    () => {
      setUrl(`/api/authors/${search}`);
      setIsFetching(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname, search]
  );

  if (isFetching) return <div>Загрузка</div>;
  if (errorText) return <p>{errorText}</p>;
  return <Authors authors={authors} />;
};
export default AuthorsContainer;
