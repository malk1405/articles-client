import React, { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router-dom";

const AuthorsContainer = ({ location: { pathname, search } }) => {
  const [authors, setAuthors] = useState([]);
  const [setErrorText] = useState("");

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
  if (authors.length === 0) return <div> Авторов нет</div>;
  return (
    <ol>
      {authors.map(el => {
        let fullName = el.name;
        if (el.patronym) fullName += " " + el.patronym;
        fullName += " " + el.lastname;
        return (
          <li key={el._id}>
            <Link to={`/authors/${el._id}`}>{fullName}</Link>
          </li>
        );
      })}
    </ol>
  );
};
export default AuthorsContainer;
