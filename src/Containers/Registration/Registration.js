import React, { Component } from "react";
import { AuthContext } from "../../Context/auth";
import Signin from "../../Components/Signin/Signin";
import Signup from "../../Components/Signup/Signup";
import "./Registration.css";
import Backdrop from "../Backdrop/Backdrop";

class Registration extends Component {
  state = {
    isVisible: false,
    signin: false
  };

  showSignin = () => {
    this.setState({ isVisible: true, signin: true });
  };

  showSignup = () => {
    this.setState({ isVisible: true, signin: false });
  };

  hideModal = () => {
    this.setState({
      isVisible: false
    });
  };

  render() {
    return (
      <AuthContext.Consumer>
        {({ login }) => (
          <React.Fragment>
            <button name="signin" id="signin" onClick={this.showSignin}>
              Войти
            </button>
            <button name="signup" id="signup" onClick={this.showSignup}>
              Регистрация
            </button>
            {!this.state.isVisible ? null : (
              <Backdrop hide={this.hideModal}>
                {this.state.signin ? (
                  <Signin
                    hide={this.hideModal}
                    login={login}
                    onSignup={this.showSignup}
                  />
                ) : (
                  <Signup login={login} />
                )}
              </Backdrop>
            )}
          </React.Fragment>
        )}
      </AuthContext.Consumer>
    );
  }
}
export default Registration;
