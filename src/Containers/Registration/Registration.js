import React, { Component } from "react";
import { AuthContext } from "../../Context/auth";
import Signin from "../../Components/Signin/Signin";
import Signup from "../../Components/Signup/Signup";
import "./Registration.css";
import Backdrop from "../Backdrop/Backdrop";

class Registration extends Component {
  state = {
    isVisible: false,
    form: "signin"
  };

  showForm = event => {
    this.setState({ isVisible: true, form: event.target.name });
  };

  hideModal = () => {
    this.setState({
      isVisible: false
    });
  };

  render() {
    return (
      <React.Fragment>
        <button name="signin" onClick={this.showForm}>
          Войти
        </button>
        <button name="signup" onClick={this.showForm}>
          Регистрация
        </button>
        {!this.state.isVisible ? null : (
          <Backdrop hide={this.hideModal}>
            <AuthContext.Consumer>
              {({ login }) =>
                this.state.form === "signin" ? (
                  <Signin login={login} onSignup={this.showForm} />
                ) : (
                  <Signup login={login} />
                )
              }
            </AuthContext.Consumer>
          </Backdrop>
        )}
      </React.Fragment>
    );
  }
}
export default Registration;
