import React, { useState } from "react";
import useForm from "../../hooks/useForm";
import useAxios from "../../hooks/useAxios";

const Signup = props => {
  const [errorText, setErrorText] = useState("");

  const { setData, setIsFetching } = useAxios({
    url: "/api/authors",
    method: "post",
    onSuccess: ({ data: fetchedUser }) => {
      props.login(fetchedUser);
    },
    onFailure: setErrorText
  });

  const { values, handleChange, handleSubmit } = useForm({
    submit: () => {
      setData({ ...values });
      setIsFetching(true);
    }
  });

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
