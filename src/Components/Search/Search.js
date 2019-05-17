import React, { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";

const Search = ({ location: { search } }) => {
  const [data, setData] = useState({});
  const onSuccess = ({ data }) => {
    setData(data);
  };

  const { setUrl, setIsFetching } = useAxios({ onSuccess });
  useEffect(() => {
    const url = "/api/search/" + search;
    setIsFetching(true);
    setUrl(url);
    return () => {
      setIsFetching(false);
    };
  }, [search]);
  return (
    <>
      <button>
        Статьи
        {typeof data.articlesNumber === "number"
          ? ` ${data.articlesNumber}`
          : null}
      </button>
      <button>
        Авторы{" "}
        {typeof data.authorsNumber === "number"
          ? ` ${data.authorsNumber}`
          : null}
      </button>
    </>
  );
};

export default Search;
