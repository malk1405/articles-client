import React, { useState, useEffect } from "react";
import Axios from "axios";
import useForm from "../../hooks/useForm";

const Signup = props => {
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
      const postUser = async () => {
        try {
          const { data: newUser } = await Axios.post(
            "/api/authors",
            { ...values },
            { cancelToken: signal.token }
          );
          setIsSubmitting(false);
          props.login(newUser);
        } catch (err) {
          if (Axios.isCancel(err)) {
          } else {
            setErrorText(err.response.data.message);
            setIsSubmitting(false);
          }
        }
      };
      postUser();
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
        <label htmlFor="name">First name</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          required
          value={values.name || ""}
        />
        <label htmlFor="lastname">Last name</label>
        <input
          type="text"
          name="lastname"
          onChange={handleChange}
          required
          value={values.lastname || ""}
        />
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
          Sign Up
        </button>
      </form>
      {errorText !== "" ? <p>{errorText}</p> : null}
    </div>
  );
};

export default Signup;
