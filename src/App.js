import React from "react";
import { AuthContext } from "./Context/auth";
import { Route, Redirect, Switch } from "react-router-dom";
import Articles from "./Components/Articles/Articles";
import "./App.css";
import Author from "./Components/Author/Author";
import Navigation from "./Components/Navigation/Navigation";

const RedirectFromHome = () => <Redirect to="/articles" />;

class App extends React.Component {
  login = user => {
    this.setState({
      user: { ...user }
    });
  };

  logout = () => {
    this.setState({ user: null });
  };

  state = { user: null, login: this.login, logout: this.logout };

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        <div className="grid-container">
          <Navigation />
          <main>
            <Switch>
              {/* <Route path="/articles/:articleId" component={Article} /> */}
              <Route path="/articles" component={Articles} />
              <Route path="/authors/:authorId" exact component={Author} />
              {/* <Route path="/authors" component={Authors} />
            <Route path="/new-author" component={NewAuthor} />
            <Route path="/new-article" component={NewAritcle} /> */}
              <Route path="/" component={RedirectFromHome} />
            </Switch>
          </main>
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
