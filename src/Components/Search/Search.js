import React, { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { getTokens, createQuery } from "../../utils/query";
import Articles from "../Articles/Articles";
import Authors from "../Authors/Authors";
import Form from "../Form/Form";
import { FormContext } from "../../Context/form";

const limits = [2, 6, 9, 12, 15];
const getPageName = (tokens, buttons) => {
  if (!buttons.length) return "";
  const index = tokens.findIndex(([name]) => name === "page");

  if (index < 0) return buttons[0].name;

  const value = tokens[index][1];

  if (!buttons.find(({ name }) => name === value)) return buttons[0].name;
  return value;
};

const getTokenArray = search => {
  let result = {};
  getTokens(search).forEach(([name, value]) => {
    result[name] = value;
  });
  return result;
};

const getInitLimit = search => {
  let tokens = getTokenArray(search);
  return tokens.limit || limits[0];
};

const Search = ({ location: { search }, history }) => {
  const [data, setData] = useState({ buttons: [] });
  const [limit, setLimit] = useState(getInitLimit(search));
  const onSuccess = ({ data }) => {
    setData(data);
  };
  const { setUrl, setIsFetching } = useAxios({ onSuccess });
  useEffect(
    () => {
      const url = "/api/search" + search;
      setIsFetching(true);
      setUrl(url);
      return () => {
        setIsFetching(false);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search]
  );

  useEffect(() => {
    let tokens = getTokenArray(search);

    tokens.limit = limit;
    tokens = Object.keys(tokens)
      .map(el => [el, tokens[el]])
      .filter(([name, value]) => value);
    history.push(createQuery(tokens));
  }, [limit]);

  const handlePush = ({ target: { name } }) => {
    let tokens = getTokens(search).filter(([name]) => name !== "page");
    tokens.push(["page", name]);

    history.push(createQuery(tokens));
  };

  const onSubmit = values => {
    let tokens = getTokenArray(getTokens(search));
    tokens = { ...tokens, ...values };
    tokens = Object.keys(tokens)
      .map(el => [el, tokens[el]])
      .filter(([name, value]) => value);
    history.push(createQuery(tokens));
  };

  const pageName = getPageName(getTokens(search), data.buttons);

  const main = () => {
    switch (pageName) {
      case "authors":
        return <Authors authors={data.authors || []} />;
      default:
        return <Articles articles={data.articles || []} />;
    }
  };

  const handleLimitChange = ({ target: { name, value } }) => {
    setLimit(value);
    let tokens = getTokenArray(search);
    tokens.limit = value;
    tokens = Object.keys(tokens)
      .map(el => [el, tokens[el]])
      .filter(([name, value]) => value);
    history.push(createQuery(tokens));

    console.log(tokens);
  };

  const getPageNumber = number => {
    if (!number) return 1;

    return Math.ceil(number / limit);
  };
  let pageNumber = 1;
  switch (pageName) {
    case "authors":
      console.log(data);
      if (data) pageNumber = getPageNumber(data.authorsNumber);
      break;

    default:
      if (data) pageNumber = getPageNumber(data.articlesNumber);
      break;
  }

  const pageButtons = [];
  if (pageNumber > 1)
    for (let i = 1; i <= pageNumber; i++) {
      pageButtons.push(i);
    }
  return (
    <>
      <div>
        {data.buttons.map(({ name, title }) => {
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
      </div>
      <div>
        {Array.isArray(data.fields) ? (
          <FormContext.Provider value={{ fields: data.fields, onSubmit }}>
            <Form className="signup-form" fields={data.fields}>
              <button type="submit">Применить</button>
            </Form>
          </FormContext.Provider>
        ) : (
          "bad"
        )}
      </div>
      <select onChange={handleLimitChange} value={limit}>
        {limits.map(el => (
          <option key={el}>{el}</option>
        ))}
      </select>
      {pageButtons.map(el => (
        <button key={el}>{el}</button>
      ))}
      {main()}
    </>
  );
};

export default Search;
