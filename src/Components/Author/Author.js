import React, { Component } from "react";
import { AuthContext } from "../../Context/auth";
import Info from "./Info";
import Home from "./Home";

export default class Author extends Component {
  render() {
    const { pathname } = this.props.location;
    const id = pathname.split("/")[2];
    return (
      <AuthContext.Consumer>
        {({ user, login }) => {
          if (!user || user._id !== id) return <Info pathname={pathname} />;
          return <Home user={user} login={login} />;
        }}
      </AuthContext.Consumer>
    );
  }
}
