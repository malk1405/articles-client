import React, { Component } from "react";
import "../Signup.css";
import axios from "axios";

class Form extends Component {
  state = { user: { email: "", password: "" }, errorText: "" };
  onEdit = event => {
    const user = { ...this.state.user };
    user[event.target.id] = event.target.value;
    this.setState({ user });
  };

  onSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state.user;
    axios
      .get(`/api/authors/?email=${email}&password=${password}`)
      .then(({ data }) => {
        if (data[0]) {
          this.props.login(data[0]);
          this.props.hide();
        } else {
          this.setState({ errorText: "Пользователь не найден" });
        }
      });
  };

  render() {
    return (
      <React.Fragment>
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
        <div className="backdrop" onClick={this.props.hide} />
      </React.Fragment>
    );
  }
}

export default Form;
