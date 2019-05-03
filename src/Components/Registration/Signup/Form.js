import React, { Component } from "react";
import "../Signup.css";
import axios from "axios";

class Form extends Component {
  state = { name: "", lastname: "", email: "", password: "" };
  onEdit = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const { name, lastname } = this.state;
    axios.post("/api/authors", { name, lastname }).then(({ data }) => {
      this.props.login(data);
    });
    this.props.hide();
  };
  render() {
    return (
      <React.Fragment>
        <div className="modal">
          <form action="index.html" className="signup-form">
            <label htmlFor="name">First name</label>
            <input
              type="text"
              id="name"
              onChange={this.onEdit}
              required
              value={this.state.name}
            />
            <label htmlFor="lastname">Last name</label>
            <input
              type="text"
              id="lastname"
              onChange={this.onEdit}
              required
              value={this.state.lastname}
            />
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
              Sign Up
            </button>
          </form>
        </div>
        <div className="backdrop" onClick={this.props.hide} />
      </React.Fragment>
    );
  }
}

export default Form;
