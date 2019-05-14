import React, { useContext } from "react";
import { AuthContext } from "../../../Context/auth";
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
    <>
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
            <button
              name="user"
              onClick={() => {
                history.push(`/authors/${user._id}`);
              }}
            >
              Личный кабинет
            </button>

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
            <button name="user" onClick={logout}>
              Выйти
            </button>
          </div>
        ) : null}
      </div>
      {isVisibleNewArticle ? (
        <Backdrop hide={hideNewArticle}>
          <NewArticles hide={hideNewArticle} />
        </Backdrop>
      ) : null}
    </>
  );
};

export default withRouter(Menu);
