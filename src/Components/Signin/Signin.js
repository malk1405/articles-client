import React, { useState } from "react";
import useForm from "../../hooks/useForm";
import useAxios from "../../hooks/useAxios";

const Signin = props => {
  const [errorText, setErrorText] = useState("");

  const { setData, setIsFetching } = useAxios({
    url: "/api/auth",
    method: "post",
    onSuccess: ({ data: { user } }) => {
      if (user) {
        props.login(user);
      } else {
        setErrorText("Пользователь не найден");
      }
    },
    onFailure: setErrorText
  });

  const { values, handleChange, handleSubmit } = useForm({
    submit: () => {
      const { email, password } = values;
      setData({ email, password });
      setIsFetching(true);
    }
  });

  return (
    <div className="modal">
      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="email">E-Mail</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          required
          value={values.email || ""}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          required
          value={values.password || ""}
        />
        <button type="submit" className="button">
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
