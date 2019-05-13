import React, { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router-dom";

const Authors = ({ location: { pathname, search } }) => {
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
        return (
          <li key={el._id}>
            <Link to={`/authors/${el._id}`}>
              {" "}
              {`${el.name} ${el.lastname}`}
            </Link>
          </li>
        );
      })}
    </ol>
  );
};
export default Authors;
