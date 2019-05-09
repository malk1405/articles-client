import React, { useState, useEffect } from "react";
import Axios from "axios";

const Signup = props => {
  const [user, setUser] = useState({});
  const [errorText, setErrorText] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(
    () => {
      if (!isSending) return () => {};
      const signal = Axios.CancelToken.source();
      const postUser = async () => {
        try {
          const { data: newUser } = await Axios.post(
            "/api/authors",
            { ...user },
            { cancelToken: signal.token }
          );
          setIsSending(false);
          props.login(newUser);
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

  const onSubmit = event => {
    event.preventDefault();
    setIsSending(true);
  };

  return (
    <div className="modal">
      <form className="signup-form">
        <label htmlFor="name">First name</label>
        <input
          type="text"
          name="name"
          onChange={onChange}
          required
          value={user.name || ""}
        />
        <label htmlFor="lastname">Last name</label>
        <input
          type="text"
          name="lastname"
          onChange={onChange}
          required
          value={user.lastname || ""}
        />
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
          Sign Up
        </button>
      </form>
      {errorText !== "" ? <p>{errorText}</p> : null}
    </div>
  );
};

export default Signup;
