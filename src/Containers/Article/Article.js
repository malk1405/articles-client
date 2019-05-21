import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import AuthorsList from "../../Components/AuthorsList/AuthorsList";

const ArticlesContainer = ({ location: { pathname } }) => {
  const [errorText, setErrorText] = useState("");
  const [article, setArticle] = useState();
  const id = pathname.split("/")[2];
  const {
    isFetching: isLoading,
    setUrl: setLoadUrl,
    setIsFetching: setIsLoading
  } = useAxios({
    onSuccess: ({ data }) => {
      setArticle(data);
    },
    onFailure: setErrorText
  });

  useEffect(
    () => {
      let url = `/api${pathname}`;
      setLoadUrl(url);
      setIsLoading(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );
  if (!article) return <p>Статья не найдена</p>;
  return (
    <div>
      <h2>{article.title}</h2>
      <p>Год публикации: {new Date(article.publicationDate).getFullYear()}</p>
      <p>Количество страниц: {article.pages}</p>
      {Array.isArray(article.authors) && article.authors.length > 0 ? (
        <>
          <p>Авторы: </p>
          <AuthorsList authors={article.authors} />
        </>
      ) : null}
    </div>
  );
};

export default ArticlesContainer;
