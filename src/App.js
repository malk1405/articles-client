import React from "react";
import { AuthContext } from "./Context/auth";
import "./App.css";

import Navigation from "./Components/Navigation/Navigation";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.login = user => {
      this.setState({
        user: { ...user }
      });
    };

    this.logout = () => {
      this.setState({ user: null });
    };

    this.state = { user: null, login: this.login, logout: this.logout };
  }
  render() {
    return (
      <AuthContext.Provider value={this.state}>
        <div className="grid-container">
          <Navigation />
          <div className="main">фывафва</div>
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
