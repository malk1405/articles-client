import React from "react";
import { AuthContext } from "../../Context/auth";
import Registration from "../../Containers/Registration/Registration";
import logo from "./logo.gif";
import "./Navigation.css";
import Menu from "./Menu/Menu";
import { NavLink, withRouter } from "react-router-dom";
import useForm from "../../hooks/useForm";

const Navigation = ({ history }) => {
  const { values, handleChange, handleSubmit } = useForm({
    initialValue: {},
    submit: () => {
      if (!values || typeof values.search !== "string") return;

      let url = "/search";
      if (values.search) url += `?value=${values.search}`;

      history.push(url);
    }
  });

  return (
    <>
      <img className="logo" src={logo} alt={"logo"} />
      <div className="banner">
        <h1 className="center">
          Московский авиацонный институт
          <br />
          (национальный иcследовательский университет)
        </h1>
        <h2 className="center">
          Кафедра 304 "Вычислительные машины, системы и сети"
        </h2>
      </div>
      <nav>
        <div className="links">
          <NavLink
            activeClassName="nav__link-active"
            to={"/authors"}
            className="nav__link"
          >
            Список авторов
          </NavLink>
          <NavLink
            activeClassName="nav__link-active"
            to={"/articles"}
            className="nav__link"
          >
            Список статей
          </NavLink>
        </div>
        <div className="nav__find">
          <AuthContext.Consumer>
            {({ user }) => (user !== null ? <Menu /> : <Registration />)}
          </AuthContext.Consumer>
          <form onSubmit={handleSubmit} className="nav__find--form">
            <input
              value={values.search || ""}
              onChange={handleChange}
              type="text"
              name="search"
              placeholder="Поиск.."
            />
          </form>
        </div>
      </nav>
    </>
  );
};

export default withRouter(Navigation);
