import React, { Component } from "react";
import logo from "./logo.gif";
import Signup from "../Signup/Signup";
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
          <button name="registr" id="registr" onClick={this.showModal}>
            Войти
          </button>
          <form>
            <input type="text" name="search" placeholder="Поиск.." />
          </form>
        </div>
        {this.state.isVisible ? <Signup hide={this.hideModal} /> : null}
      </React.Fragment>
    );
  }
}

export default Navigation;
