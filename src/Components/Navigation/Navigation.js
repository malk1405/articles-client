import React, { Component } from "react";
import { AuthContext } from "../../Context/auth";
import Signup from "../Signup/Signup";
import logo from "./logo.gif";

class Navigation extends Component {
  state = { isVisible: false };
  showModal = () => {
    this.setState({ isVisible: true });
  };
  hideModal = () => {
    this.setState({ isVisible: false });
  };
  render() {
    return (
      <React.Fragment>
        <img className="logo" src={logo} alt={"logo"} />
        <div className="banner">
          <h1 className="center">
            Московский авиацонный институт
            <br /> (национальный иследовательский университет)
          </h1>
          <h2 className="center">
            Кафедра 304 "Вычислительные машины, системы и сети"
          </h2>
        </div>
        <h2 className="authors h3">Список авторов</h2>
        <div className="find">
          <AuthContext.Consumer>
            {({ user, logout }) =>
              user !== null ? (
                <button name="user" onClick={logout}>{`${user.name} ${
                  user.lastname
                }`}</button>
              ) : (
                <button name="registr" id="registr" onClick={this.showModal}>
                  Войти
                </button>
              )
            }
          </AuthContext.Consumer>
          <form>
            <input type="text" name="search" placeholder="Поиск.." />
          </form>
        </div>
        {this.state.isVisible ? (
          <AuthContext.Consumer>
            {({ login }) => <Signup hide={this.hideModal} login={login} />}
          </AuthContext.Consumer>
        ) : null}
      </React.Fragment>
    );
  }
}

export default Navigation;
