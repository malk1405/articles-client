import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef
} from "react";
import { AuthContext } from "./Context/auth";
import { Route, Redirect, Switch } from "react-router-dom";
import Articles from "./Containers/Articles/Articles";
import "./App.css";
import Author from "./Components/Author/Author";
import Navigation from "./Components/Navigation/Navigation";
import Authors from "./Containers/Authors/Authors";
import Search from "./Components/Search/Search";

const RedirectFromHome = () => <Redirect to="/articles" />;

const getInitialUser = () => JSON.parse(window.localStorage.getItem("user"));

const App = () => {
  const [user, setUser] = useState(getInitialUser);

  const login = useCallback(user => {
    setUser({ ...user });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const justMounted = useRef(true);

  useEffect(() => {
    if (!justMounted.current)
      window.localStorage.setItem("user", JSON.stringify(user));

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
            <Route path="/search" component={Search} />
            <Route path="/articles" component={Articles} />
            <Route path="/authors/:authorId" exact component={Author} />
            <Route path="/authors" component={Authors} />
            <Route path="/" component={RedirectFromHome} />
          </Switch>
        </main>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
