import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router-dom";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [errorText, setErrorText] = useState("");
  const { isFetching, setIsFetching } = useAxios({
    isFetching: true,
    url: `/api/authors/`,
    onSuccess: responce => {
      if (responce) setAuthors(responce.data);
    },
    onFailure: setErrorText
  });
  if (isFetching) return <div>Загрузка</div>;
  if (authors.length == 0) return <div> Авторов нет</div>;
  return authors.map(el => {
    return (
      <ul>
        <Link to={`/authors/${el._id}`}> {`${el.name} ${el.lastname}`}</Link>
      </ul>
    );
  });
};
export default Authors;
