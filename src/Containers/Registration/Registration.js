import React, { useState, useContext } from "react";
import { AuthContext } from "../../Context/auth";
import "./Registration.css";
import Backdrop from "../Backdrop/Backdrop";
import useVisibility from "../../hooks/useVisibility";
import FormHandler from "../FormHandler/FormHandler";
import Form from "../../Components/Form/Form";

const Registration = () => {
  const { isVisible, show, hide } = useVisibility(false);
  const { login } = useContext(AuthContext);
  const [signIn, setSignIn] = useState(true);

  const showForm = ({ target: { name } }) => {
    show();
    setSignIn(name === "signin");
  };
  const onSuccess = ({ data: { user } }) => {
    login(user);
  };
  const buttons = [
    <button type="submit" key={0} className="button">
      {signIn ? "Войти" : "Регистрация"}
    </button>
  ];

  if (signIn)
    buttons.push(
      <button
        type="button"
        name="signup"
        onClick={showForm}
        key={1}
        className="button"
      >
        Регистрация
      </button>
    );

  return (
    <>
      <button name="signin" onClick={showForm}>
        Войти
      </button>
      <button name="signup" onClick={showForm}>
        Регистрация
      </button>
      {!isVisible ? null : (
        <Backdrop hide={hide}>
          <FormHandler
            className="modal"
            loadingUrl={signIn ? "/api/auth/signin" : "/api/auth/signup"}
            fetchingUrl={signIn ? "/api/auth" : "/api/authors"}
            method="post"
            onSuccess={onSuccess}
          >
            <Form className="signup-form">{buttons}</Form>
          </FormHandler>
        </Backdrop>
      )}
    </>
  );
};

export default Registration;
