import React, { useState, useEffect } from "react";
import Axios from "axios";
import useForm from "../../hooks/useForm";

const Signin = props => {
  const [errorText, setErrorText] = useState("");
  const {
    values,
    handleChange,
    handleSubmit,
    isSubmitting,
    setIsSubmitting
  } = useForm();

  useEffect(
    () => {
      if (!isSubmitting) return () => {};
      const signal = Axios.CancelToken.source();
      const getUser = async ({ email, password }) => {
        try {
          const { data: fetchedUser } = await Axios.get(
            `/api/authors/?email=${email}&password=${password}`,
            { cancelToken: signal.token }
          );
          setIsSubmitting(false);
          if (fetchedUser[0]) {
            props.login(fetchedUser[0]);
          } else {
            setErrorText("Пользователь не найден");
          }
        } catch (err) {
          if (Axios.isCancel(err)) {
          } else {
            setErrorText(err);
            setIsSubmitting(false);
          }
        }
      };
      getUser(values);
      return () => {
        signal.cancel("Api is being cancelled");
      };
    },
    // eslint-disable-next-line
    [isSubmitting]
  );

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
