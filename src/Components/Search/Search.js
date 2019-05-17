import React, { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";

const Search = ({ location: { search }, history }) => {
  const [data, setData] = useState({});
  const onSuccess = ({ data }) => {
    setData(data);
  };

  const { setUrl, setIsFetching } = useAxios({ onSuccess });
  useEffect(
    () => {
      const url = "/api/search/" + search;
      setIsFetching(true);
      setUrl(url);
      return () => {
        setIsFetching(false);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search]
  );

  const handlePush = ({ target: { name } }) => {
    let searchArray = search
      .split(/\?|&/)
      .filter(el => el)
      .map(el => el.split(/=/))
      .filter(([name]) => name !== "page");
    searchArray.push(["page", name]);

    let query = "?" + searchArray.map(el => el.join("=")).join("&");
    history.push(query);
  };

  return (
    <>
      <button name="articles" onClick={handlePush}>
        Статьи
        {typeof data.articlesNumber === "number"
          ? ` ${data.articlesNumber}`
          : null}
      </button>
      <button name="authors" onClick={handlePush}>
        Авторы{" "}
        {typeof data.authorsNumber === "number"
          ? ` ${data.authorsNumber}`
          : null}
      </button>
    </>
  );
};

export default Search;
