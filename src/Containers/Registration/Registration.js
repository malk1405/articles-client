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

  return (
    <>
      <button name="signin" className="nav__find--button" onClick={showForm}>
        Войти
      </button>
      <button name="signup" className="nav__find--button" onClick={showForm}>
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
            <Form className="signup-form">
              <button type="submit" className="signup-form__button">
                {signIn ? "Войти" : "Регистрация"}
              </button>
              {signIn ? (
                <button
                  type="button"
                  className="signup-form__button"
                  name="signup"
                  onClick={showForm}
                >
                  Регистрация
                </button>
              ) : null}
            </Form>
          </FormHandler>
        </Backdrop>
      )}
    </>
  );
};

export default Registration;
