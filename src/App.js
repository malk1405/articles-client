import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef
} from "react";
import { AuthContext } from "./Context/auth";
import { Route, Redirect, Switch } from "react-router-dom";
import Articles from "./Components/Articles/Articles";
import "./App.css";
import Author from "./Components/Author/Author";
import Navigation from "./Components/Navigation/Navigation";

const RedirectFromHome = () => <Redirect to="/articles" />;

const App = () => {
  const [user, setUser] = useState(null);

  const login = useCallback(user => {
    setUser({ ...user });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const justMounted = useRef(true);

  useEffect(() => {
    if (justMounted.current) {
      setUser(JSON.parse(window.localStorage.getItem("user")));
    } else {
      window.localStorage.setItem("user", JSON.stringify(user));
    }
    justMounted.current = false;
  }, [user]);

  const value = useMemo(
    () => ({ user, login, logout }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
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
};

export default App;
