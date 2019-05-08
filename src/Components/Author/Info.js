import React, { useState, useEffect } from "react";
import Axios from "axios";

const Info = ({ pathname }) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const signal = Axios.CancelToken.source();
    const onLoadUser = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const response = await Axios.get(`/api/${pathname}`, {
          cancelToken: signal.token
        });
        setIsLoading(false);
        setUser(response.data);
      } catch (err) {
        if (Axios.isCancel(err)) {
        } else {
          setIsLoading(false);
          setError(true);
        }
      }
    };
    onLoadUser();
    return () => {
      signal.cancel("Api is being canceled");
    };
  }, [pathname]);

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка</p>;
  return (
    <ul>
      <li>Имя: {user.name}</li>
      <li>Фамилия: {user.lastname}</li>
      <li>Дата рождения:</li>
      <li>Email: {user.email}</li>
    </ul>
  );
};

export default Info;
