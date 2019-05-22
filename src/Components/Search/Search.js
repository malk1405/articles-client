import React, { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import {
  getTokensArray,
  createQueryFromArray,
  getTokensObject
} from "../../utils/query";
import Articles from "../Articles/Articles";
import Authors from "../Authors/Authors";
import Form from "../Form/Form";
import { FormContext } from "../../Context/form";
import Buttons from "../Pagination/Buttons";

const limits = [3, 6, 9, 12, 15];
const getPageName = (tokens, buttons) => {
  if (!buttons.length) return "";
  const index = tokens.findIndex(([name]) => name === "page");

  if (index < 0) return buttons[0].name;

  const value = tokens[index][1];

  if (!buttons.find(({ name }) => name === value)) return buttons[0].name;
  return value;
};

const getInitLimit = search => {
  let tokens = getTokensObject(search);
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
    let tokens = getTokensObject(search);

    tokens.limit = limit;
    tokens = Object.keys(tokens)
      .map(el => [el, tokens[el]])
      .filter(([name, value]) => value);
    history.push(createQueryFromArray(tokens));
  }, [limit]);

  const handlePush = ({ target: { name } }) => {
    let tokens = getTokensArray(search).filter(([name]) => name !== "page");
    tokens.push(["page", name]);

    history.push(createQueryFromArray(tokens));
  };

  const onSubmit = values => {
    let tokens = getTokensObject(search);
    tokens = { ...tokens, ...values };
    tokens = Object.keys(tokens)
      .map(el => [el, tokens[el]])
      .filter(([name, value]) => value);
    history.push(createQueryFromArray(tokens));
  };

  const pageName = getPageName(getTokensArray(search), data.buttons);

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
    let tokens = getTokensObject(search);
    tokens.limit = value;
    tokens = Object.keys(tokens)
      .map(el => [el, tokens[el]])
      .filter(([name, value]) => value);
    history.push(createQueryFromArray(tokens));

    console.log(tokens);
  };

  const getPageNumber = number => {
    if (!number) return 1;

    return Math.ceil(number / limit);
  };
  let pageNumber = 1;
  switch (pageName) {
    case "authors":
      if (data) pageNumber = getPageNumber(data.authorsNumber);
      break;

    default:
      if (data) pageNumber = getPageNumber(data.articlesNumber);
      break;
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
      <Buttons pages={pageNumber} />
      {main()}
    </>
  );
};

export default Search;
