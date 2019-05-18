import React, { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { getTokens, createQuery } from "../../utils/query";

const buttons = [
  { name: "articles", title: "Статьи" },
  { name: "authors", title: "Авторы" }
];
const getPageName = tokens => {
  const index = tokens.findIndex(([name]) => name === "page");

  if (index < 0) return buttons[0].name;

  const value = tokens[index][1];

  if (!buttons.find(({ name }) => name === value)) return buttons[0].name;
  return value;
};

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
    let tokens = getTokens(search).filter(([name]) => name !== "page");
    tokens.push(["page", name]);

    history.push(createQuery(tokens));
  };

  const pageName = getPageName(getTokens(search));
  console.log(pageName);
  return (
    <>
      {buttons.map(({ name, title }) => {
        const num = data[`${name}Number`];
        return (
          <button
            key={name}
            name={name}
            style={{ backgroundColor: pageName === name ? "green" : "grey" }}
            onClick={handlePush}
          >
            {title}
            {typeof num === "number" ? ` ${num}` : null}
          </button>
        );
      })}
    </>
  );
};

export default Search;
