import React, { Component } from "react";
import "./signup.css";

class Modal extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="modal">
          <form action="index.html" className="signup-form">
            <label htmlFor="first-name">First name</label>
            <input type="text" id="first-name" required />
            <label htmlFor="last-name">Last name</label>
            <input type="text" id="last-name" required />
            <label htmlFor="email">E-Mail</label>
            <input type="email" id="email" required />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required />

            <button type="submit" className="button">
              Sign Up
            </button>
          </form>
        </div>
        <div className="backdrop" onClick={this.props.hide} />
      </React.Fragment>
    );
  }
}

export default Modal;
