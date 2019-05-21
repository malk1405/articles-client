import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/auth";
import "./articles.css";
import useAxios from "../../hooks/useAxios";
import { withRouter } from "react-router-dom";
import Article from "../Article/Article";

const Articles = ({ articles, history }) => {
  const { user } = useContext(AuthContext);
  const [checkboxes, setCheckboxes] = useState({});

  const handleChange = ({ target: { name } }) => {
    if (checkboxes[name]) {
      const { [name]: n, ...newV } = checkboxes;
      setCheckboxes(newV);
    } else setCheckboxes({ ...checkboxes, [name]: true });
  };

  const { isFetching, setIsFetching, setData } = useAxios({
    url: `/api/articles`,
    method: "delete"
  });

  const handleDelete = () => {
    setData({ id: Object.keys(checkboxes) });
    setIsFetching(true);
  };

  const isChecked = () => {
    return Object.keys(checkboxes).length > 0;
  };
  return (
    <>
      <ol className="articles">
        {articles.map((el, index) => (
          <li key={el._id} className="article">
            <Article
              article={el}
              currentId={user ? user._id : null}
              checked={Boolean(checkboxes[el._id])}
              index={index}
              handleChange={handleChange}
            />
          </li>
        ))}
      </ol>
      {isChecked() ? <button onClick={handleDelete}> Удалить </button> : null}
    </>
  );
};

export default withRouter(Articles);
