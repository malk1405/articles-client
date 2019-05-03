import React, { Component } from "react";
import logo from "./MAI1.gif";
import Modal from "./modal";
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
        <img className="item2" src={logo} alt={"logo"} />
        <div className="item1">
          <h1 className="center">
            Московский авиацонный институт
            <br /> (национальный иследовательский университет)
          </h1>
          <h2 className="center">
            Кафедра 304 "Вычислительные машины, системы и сети"
          </h2>
          <h2 className="h3">Список авторов</h2>
          <div className="item4">
            <button name="registr" id="registr" onClick={this.showModal}>
              Войти
            </button>
            <form>
              <input type="text" name="search" placeholder="Поиск.." />
            </form>
          </div>
          {this.state.isVisible ? <Modal hide={this.hideModal} /> : null}
        </div>
      </React.Fragment>
    );
  }
}

export default Navigation;
