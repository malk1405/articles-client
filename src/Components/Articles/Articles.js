import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/auth";
import "./articles.css";
import useAxios from "../../hooks/useAxios";
import { withRouter } from "react-router-dom";

const Articles = ({ articles, history }) => {
  const { user } = useContext(AuthContext);
  const [checkboxes, setCheckboxes] = useState({});

  const isMyArticle = article => {
    if (!user) return false;
    return (
      article.authors.findIndex(({ authorId }) => authorId === user._id) >= 0
    );
  };
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
      {" "}
      <ol className="articles">
        {articles.map((el, index) => {
          const authors = () => {
            if (!el.authors.length) return null;
            const result = [];
            el.authors.forEach(el => {
              let author = `${el.lastname} ${el.name}`;
              if (el.authorId)
                author = <Link to={`/authors/${el.authorId}`}>{author}</Link>;
              author = (
                <li className="articles_author" key={el._id}>
                  {author}
                </li>
              );
              result.push(author);
            });
            return <ul>{result}</ul>;
          };
          return (
            <li
              className="article"
              onClick={() => {
                history.push("/articles");
              }}
              key={el._id}
            >
              {isMyArticle(el) ? (
                <input
                  type="checkbox"
                  checked={Boolean(checkboxes[el._id])}
                  name={el._id}
                  onChange={handleChange}
                />
              ) : null}

              <div>
                <span>{index + 1}. </span>
                <span
                  style={{ fontWeight: isMyArticle(el) ? "bold" : "normal" }}
                >
                  {el.title}
                </span>
                , {new Date(el.publicationDate).getFullYear()}
                {authors()}
              </div>
            </li>
          );
        })}
      </ol>
      {isChecked() ? <button onClick={handleDelete}> Удалить </button> : null}
    </>
  );
};

export default withRouter(Articles);
