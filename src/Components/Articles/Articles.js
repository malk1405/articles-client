import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { AuthContext } from "../../Context/auth";

const Main = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorText, setErrorText] = useState("");
  const [articles, setArticles] = useState([]);
  const context = useContext(AuthContext);
  const id = props.location.pathname.split("/")[2];
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletedId, setDeletedId] = useState("");

  const handleDelete = id => {
    setDeletedId(id);
    setIsDeleting(true);
  };

  useEffect(() => {
    if (!isDeleting) return () => {};
    const signal = Axios.CancelToken.source();
    const onDelete = async () => {
      try {
        let url = `/api/articles/`;
        const response = await Axios({
          method: "delete",
          url,
          data: { id: deletedId }
        });
        setIsDeleting(false);
        setIsLoading(true);
      } catch (err) {
        if (Axios.isCancel(err)) {
        } else {
          setIsDeleting(false);
          setErrorText(true);
        }
      }
    };
    onDelete();
    return () => {
      signal.cancel("Api is being canceled");
    };
  }, [isDeleting]);

  useEffect(() => {
    if (!isLoading) return () => {};
    const signal = Axios.CancelToken.source();
    const onLoad = async () => {
      try {
        setIsLoading(true);
        setErrorText(false);
        let url = `/api/articles/`;
        if (id) url += `?author=${id}`;
        const response = await Axios.get(url, {
          cancelToken: signal.token
        });
        setIsLoading(false);
        setArticles(response.data);
      } catch (err) {
        if (Axios.isCancel(err)) {
        } else {
          setIsLoading(false);
          setErrorText(true);
        }
      }
    };
    onLoad();
    return () => {
      signal.cancel("Api is being canceled");
    };
  }, [isLoading]);
  if (isLoading) return <p>Загружаю...</p>;
  if (errorText) return <p>{errorText}</p>;
  return (
    <ul>
      {articles.map(el => {
        return (
          <li key={el._id}>
            <div>
              {el.title} {el.publicationDate}{" "}
              {context.user && context.user._id === id ? (
                <button
                  onClick={() => {
                    handleDelete(el._id);
                  }}
                >
                  Удалить
                </button>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Main;
