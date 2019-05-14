import React, { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import "./li.css";

const Info = ({ pathname }) => {
  const [user, setUser] = useState({});
  const [errorText, setErrorText] = useState("");

  const { isFetching, setUrl, setIsFetching } = useAxios({
    onSuccess: responce => {
      if (responce) setUser(responce.data);
    },
    onFailure: setErrorText
  });

  useEffect(
    () => {
      setUrl(`/api/${pathname}`);
      setIsFetching(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  if (isFetching) return <p>Загрузка...</p>;
  if (errorText) return <p>{errorText}</p>;
  if (!user) return <p>Пользователь не найден</p>;
  return (
    <ul className="border">
      <li>Фамилия: {user.lastname}</li>
      <li>Имя: {user.name}</li>
      <li>Отчество: {user.patronym}</li>
      <li>Дата рождения:</li>
      <li>Email: {user.email}</li>
      <li>Телефон: {user.tel}</li>
      <li>Должность: {user.post}</li>
      <li>Академическая степень:{user.acDeg}</li>
      <li>Доля ставки: {user.salary}</li>
    </ul>
  );
};

export default Info;
