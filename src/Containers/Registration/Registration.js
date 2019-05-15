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
  const [loadingUrl, setLoadingUrl] = useState();
  const [fetchingUrl, setFetchingUrl] = useState();

  const showForm = ({ target: { name } }) => {
    show();
    setLoadingUrl(name === "signin" ? "/api/auth/signin" : "/api/auth/signup");
    setFetchingUrl(name === "signin" ? "/api/auth" : "/api/authors");
  };
  const onSuccess = ({ data: { user } }) => {
    login(user);
  };
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
            loadingUrl={loadingUrl}
            fetchingUrl={fetchingUrl}
            method="post"
            onSuccess={onSuccess}
          >
            <Form className="signup-form" />
          </FormHandler>
        </Backdrop>
      )}
    </>
  );
};

export default Registration;
