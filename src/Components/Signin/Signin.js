import React, { Component } from "react";
import Axios from "axios";

class Form extends Component {
  signal = Axios.CancelToken.source();

  state = { user: { email: "", password: "" }, errorText: "" };

  componentWillUnmount() {
    this.signal.cancel("Api is being cancelled");
  }

  onEdit = event => {
    const user = { ...this.state.user };
    user[event.target.id] = event.target.value;
    this.setState({ user });
  };

  onGetUser = async ({ email, password }) => {
    try {
      const { data: user } = await Axios.get(
        `/api/authors/?email=${email}&password=${password}`,
        { cancelToken: this.signal.token }
      );
      if (user[0]) {
        this.props.login(user[0]);
      } else {
        this.setState({ errorText: "Пользователь не найден" });
      }
    } catch (err) {}
  };

  onSubmit = event => {
    event.preventDefault();
    this.onGetUser(this.state.user);
  };

  render() {
    return (
      <div className="modal">
        <form action="index.html" className="signup-form">
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            onChange={this.onEdit}
            required
            value={this.state.email}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={this.onEdit}
            required
            value={this.state.password}
          />

          <button type="submit" className="button" onClick={this.onSubmit}>
            Войти
          </button>
        </form>
        <button onClick={this.props.onSignup}>Создать учетную запись</button>
      </div>
    );
  }
}

export default Form;
