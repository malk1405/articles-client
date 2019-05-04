import React, { Component } from "react";
import { AuthContext } from "../../../Context/auth";
import { withRouter, Link } from "react-router-dom";

class Menu extends Component {
  state = { isVisible: false };
  toggleMenu = () => {
    this.setState(state => {
      return { isVisible: !state.isVisible };
    });
  };
  toCabinet = id => {
    this.props.history.push(`/authors/${id}`);
  };
  render() {
    return (
      <AuthContext.Consumer>
        {({ user, logout }) => (
          <div className="user">
            <button name="user" onClick={this.toggleMenu}>{`${user.name} ${
              user.lastname
            }`}</button>
            {this.state.isVisible ? (
              <React.Fragment>
                <Link to={`/authors/${user._id}`}>Личный кабинет</Link>
                <button
                  onClick={() => {
                    this.toCabinet(user._id);
                  }}
                />
                <button name="user">Добавить статью</button>
                <button name="user">Мои статьи</button>
                <Link to="/articles">На главную</Link>
                <button name="user" onClick={logout}>
                  Выйти
                </button>
              </React.Fragment>
            ) : null}
          </div>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default withRouter(Menu);
