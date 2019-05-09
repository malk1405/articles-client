import React, { useState, useEffect } from "react";
import Axios from "axios";

const Signin = props => {
  const [user, setUser] = useState({});
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      if (!isLoading) return () => {};
      const signal = Axios.CancelToken.source();
      const getUser = async ({ email, password }) => {
        try {
          const { data: fetchedUser } = await Axios.get(
            `/api/authors/?email=${email}&password=${password}`,
            { cancelToken: signal.token }
          );
          setIsLoading(false);
          if (fetchedUser[0]) {
            props.login(fetchedUser[0]);
          } else {
            setErrorText("Пользователь не найден");
          }
        } catch (err) {
          if (Axios.isCancel(err)) {
          } else {
            setErrorText(err);
            setIsLoading(false);
          }
        }
      };
      getUser(user);
      return () => {
        signal.cancel("Api is being cancelled");
      };
    },
    // eslint-disable-next-line
    [isLoading]
  );

  const onChange = event => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setIsLoading(true);
  };
  return (
    <div className="modal">
      <form className="signup-form">
        <label htmlFor="email">E-Mail</label>
        <input
          type="email"
          name="email"
          onChange={onChange}
          required
          value={user.email || ""}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={onChange}
          required
          value={user.password || ""}
        />
        <button type="submit" className="button" onClick={onSubmit}>
          Войти
        </button>
        <button name="signup" type="button" onClick={props.onSignup}>
          Создать учетную запись
        </button>
      </form>
      {errorText !== "" ? <p>{errorText}</p> : null}
    </div>
  );
};

export default Signin;
