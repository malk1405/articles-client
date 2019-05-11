import React, { useContext } from "react";
import { AuthContext } from "../../../Context/auth";
import { Link } from "react-router-dom";
import useVisibility from "../../../hooks/useVisibility";
import Backdrop from "../../../Containers/Backdrop/Backdrop";
import NewArticles from "../../Articles/NewArticle";
import { withRouter } from "react-router";

const Menu = ({ history }) => {
  const {
    isVisible: isVisibleMenu,
    show: showMenu,
    hide: hideMenu,
    toggle
  } = useVisibility(false);

  const { user, logout } = useContext(AuthContext);

  const {
    isVisible: isVisibleNewArticle,
    show: showNewArticle,
    hide: hideNewArticle
  } = useVisibility(false);

  const toggleMenu = e => {
    e.stopPropagation();
    toggle();
  };

  return (
    <div onMouseEnter={showMenu} onMouseLeave={hideMenu} onClick={hideMenu}>
      <button name="user" onClick={toggleMenu}>{`${user.name} ${
        user.lastname
      }`}</button>
      {isVisibleMenu ? (
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Link to={`/authors/${user._id}`}>Личный кабинет</Link>
          <button name="user" onClick={showNewArticle}>
            Добавить статью
          </button>
          <button
            name="user"
            onClick={() => {
              history.push(`/articles/${user._id}`);
            }}
          >
            Мои статьи
          </button>
          <Link to="/articles">На главную</Link>
          <button name="user" onClick={logout}>
            Выйти
          </button>
        </div>
      ) : null}
      {isVisibleNewArticle ? (
        <Backdrop hide={hideNewArticle}>
          <NewArticles hide={hideNewArticle} />
        </Backdrop>
      ) : null}
    </div>
  );
};

export default withRouter(Menu);
