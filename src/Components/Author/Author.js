import React, { Component } from "react";
import { AuthContext } from "../../Context/auth";
import Axios from "axios";

export default class Author extends Component {
  signal = Axios.CancelToken.source();

  state = { user: null, newUser: {}, isLoading: false };

  componentDidMount() {
    this.onLoadUser();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) this.onLoadUser();
  }

  componentWillUnmount() {
    this.signal.cancel("Api is being canceled");
  }

  onLoadUser = async () => {
    try {
      this.setState({ isLoading: true });
      const response = await Axios.get(`/api/${this.props.location.pathname}`, {
        cancelToken: this.signal.token
      });
      this.setState({ user: response.data, newUser: response.data });
    } catch (err) {
      if (Axios.isCancel(err)) {
      } else {
        this.setState({ isLoading: false });
      }
    }
  };

  onEdit = event => {
    const { name, value } = event.target;
    this.setState(state => {
      const newUser = { ...state.newUser };
      newUser[name] = value;
      return { newUser };
    });
  };

  onSave = login => {
    Axios.put(`/api/authors/${this.state.user._id}`, {
      ...this.state.newUser
    }).then(({ data }) => {
      login(this.state.newUser);
    });
  };
  render() {
    return this.state.user ? (
      <React.Fragment>
        <AuthContext.Consumer>
          {({ user, login }) => {
            if (!user || user._id !== this.state.user._id)
              return (
                <ul>
                  <li>Имя: {this.state.user.name}</li>
                  <li>Фамилия: {this.state.user.lastname}</li>
                  <li>Дата рождения:</li>
                  <li>Email: {this.state.user.email}</li>
                </ul>
              );
            return (
              <React.Fragment>
                <ul>
                  <li>
                    Имя:{" "}
                    <input
                      name="name"
                      value={this.state.newUser.name}
                      onChange={this.onEdit}
                    />
                  </li>
                  <li>
                    Фамилия:{" "}
                    <input
                      name="lastname"
                      value={this.state.newUser.lastname}
                      onChange={this.onEdit}
                    />
                  </li>
                  <li>
                    Дата рождения:{" "}
                    <input
                      name="birthDate"
                      value={this.state.newUser.birthDate}
                      onChange={this.onEdit}
                    />
                  </li>
                  <li>
                    Email:{" "}
                    <input
                      name="email"
                      value={this.state.newUser.email}
                      onChange={this.onEdit}
                    />
                  </li>
                </ul>
                <button onClick={() => this.onSave(login)}>Сохранить</button>
              </React.Fragment>
            );
          }}
        </AuthContext.Consumer>
      </React.Fragment>
    ) : (
      <p>Пользователь не найден</p>
    );
  }
}
