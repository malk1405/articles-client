import React, { Component } from "react";
import "../Signup.css";

class Form extends Component {
  state = { name: "", lastname: "", email: "", password: "" };
  onEdit = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    this.props.login(this.state);
    this.props.hide();
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
