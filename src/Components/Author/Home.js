import React, { useState, useEffect } from "react";
import Axios from "axios";

const Home = props => {
  const [user, setUser] = useState({ ...props.user });
  const [errorText, setErrorText] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(
    () => {
      if (!isSending) return () => {};
      const signal = Axios.CancelToken.source();
      const postUser = async () => {
        try {
          await Axios.put(`/api/authors/${user._id}`, {
            ...user
          });
          setIsSending(false);
          props.login(user);
        } catch (err) {
          if (Axios.isCancel(err)) {
          } else {
            setErrorText(err.response.data.message);
            setIsSending(false);
          }
        }
      };
      postUser();
      return () => {
        signal.cancel("Api is being cancelled");
      };
    },
    // eslint-disable-next-line
    [isSending]
  );

  const onChange = event => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const onSave = () => {
    setIsSending(true);
  };

  const onSetDefault = () => {
    setUser({ ...props.user });
  };

  return (
    <>
      <ul>
        <li>
          Имя: <input name="name" value={user.name} onChange={onChange} />
        </li>
        <li>
          Фамилия:{" "}
          <input name="lastname" value={user.lastname} onChange={onChange} />
        </li>
        <li>
          Дата рождения:{" "}
          <input name="birthDate" value={user.birthDate} onChange={onChange} />
        </li>
        <li>
          Email: <input name="email" value={user.email} onChange={onChange} />
        </li>
      </ul>
      <button onClick={onSave}>Сохранить</button>
      <button onClick={onSetDefault}>Отменить</button>
      {errorText !== "" ? <p>{errorText}</p> : null}
    </>
  );
};
export default Home;
