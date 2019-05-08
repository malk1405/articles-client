import React, { useState } from "react";
import { AuthContext } from "../../Context/auth";
import Signin from "../../Components/Signin/Signin";
import Signup from "../../Components/Signup/Signup";
import "./Registration.css";
import Backdrop from "../Backdrop/Backdrop";
import useVisibility from "../../hooks/visibility";

const Registration = () => {
  const [isVisible, show, hide] = useVisibility(false);
  const [form, setForm] = useState("signin");

  const showForm = event => {
    show();
    setForm(event.target.name);
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
          <AuthContext.Consumer>
            {({ login }) =>
              form === "signin" ? (
                <Signin login={login} onSignup={showForm} />
              ) : (
                <Signup login={login} />
              )
            }
          </AuthContext.Consumer>
        </Backdrop>
      )}
    </>
  );
};

export default Registration;
