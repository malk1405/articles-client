import React from "react";
import { AuthContext } from "../../Context/auth";
import Registration from "../../Containers/Registration/Registration";
import logo from "./logo.gif";
import "./Navigation.css";
import Menu from "./Menu/Menu";
import { Link } from "react-router-dom";

const Navigation = () => {
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

      <Link to={"/authors"} className="authors h3">
        Список авторов
      </Link>
      <div className="find">
        <AuthContext.Consumer>
          {({ user }) => (user !== null ? <Menu /> : <Registration />)}
        </AuthContext.Consumer>
        <form>
          <input type="text" name="search" placeholder="Поиск.." />
        </form>
      </div>
    </>
  );
};

export default Navigation;
