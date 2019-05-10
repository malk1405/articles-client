import React, { useContext } from "react";
import { AuthContext } from "../../../Context/auth";
import { Link } from "react-router-dom";
import useVisibility from "../../../hooks/useVisibility";

const Menu = () => {
  const { isVisible, show: showMenu, hide: hideMenu, toggle } = useVisibility(
    false
  );
  const { user, logout } = useContext(AuthContext);

  const toggleMenu = e => {
    e.stopPropagation();
    toggle();
  };

  return (
    <div onMouseEnter={showMenu} onMouseLeave={hideMenu} onClick={hideMenu}>
      <button name="user" onClick={toggleMenu}>{`${user.name} ${
        user.lastname
      }`}</button>
      {isVisible ? (
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Link to={`/authors/${user._id}`}>Личный кабинет</Link>
          <button name="user">Добавить статью</button>
          <button name="user">Мои статьи</button>
          <Link to="/articles">На главную</Link>
          <button name="user" onClick={logout}>
            Выйти
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Menu;
