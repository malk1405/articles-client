import React, { Component } from "react";
import { AuthContext } from "../../../Context/auth";
import { Link } from "react-router-dom";

class Menu extends Component {
  state = { isVisible: false };

  showMenu = () => {
    this.setState({ isVisible: true });
  };

  hideMenu = () => {
    this.setState({ isVisible: false });
  };

  toggleMenu = e => {
    e.stopPropagation();
    this.setState(state => {
      return { isVisible: !state.isVisible };
    });
  };

  render() {
    return (
      <AuthContext.Consumer>
        {({ user, logout }) => (
          <div
            onMouseEnter={this.showMenu}
            onMouseLeave={this.hideMenu}
            onClick={this.hideMenu}
          >
            <button name="user" onClick={this.toggleMenu}>{`${user.name} ${
              user.lastname
            }`}</button>
            {this.state.isVisible ? (
              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <Link to={`/authors/${user._id}`}>Личный кабинет</Link>
                <button name="user">Добавить статью</button>
                <button name="user">Мои статьи</button>
                <Link to="/articles">На главную</Link>
                <button name="user" onClick={logout}>
                  Выйти
                </button>
              </div>
            ) : null}
          </div>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default Menu;
