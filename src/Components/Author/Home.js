import React, { Component, Fragment } from "react";
import Axios from "axios";

export default class Home extends Component {
  signal = Axios.CancelToken.source();

  state = { user: { ...this.props.user } };

  componentWillUnmount() {
    this.signal.cancel("Api is being canceled");
  }

  onEdit = event => {
    const { name, value } = event.target;
    this.setState(state => {
      const user = { ...state.user };
      user[name] = value;
      return { user };
    });
  };

  onSave = () => {
    Axios.put(`/api/authors/${this.state.user._id}`, {
      ...this.state.user
    }).then(({ data }) => {
      this.props.login(this.state.user);
    });
  };

  onSetDefault = () => {
    this.setState((state, props) => {
      return { user: { ...props.user } };
    });
  };

  render() {
    const { name, lastname, email, birthDate } = this.state.user;
    return (
      <Fragment>
        <ul>
          <li>
            Имя: <input name="name" value={name} onChange={this.onEdit} />
          </li>
          <li>
            Фамилия:{" "}
            <input name="lastname" value={lastname} onChange={this.onEdit} />
          </li>
          <li>
            Дата рождения:{" "}
            <input name="birthDate" value={birthDate} onChange={this.onEdit} />
          </li>
          <li>
            Email: <input name="email" value={email} onChange={this.onEdit} />
          </li>
        </ul>
        <button onClick={this.onSave}>Сохранить</button>
        <button onClick={this.onSetDefault}>Отменить</button>
      </Fragment>
    );
  }
}
