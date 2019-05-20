import React, { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { getTokens, createQuery } from "../../utils/query";
import Articles from "../Articles/Articles";
import Authors from "../Authors/Authors";
import Form from "../Form/Form";
import { FormContext } from "../../Context/form";

const getPageName = (tokens, buttons) => {
  if (!buttons.length) return "";
  const index = tokens.findIndex(([name]) => name === "page");

  if (index < 0) return buttons[0].name;

  const value = tokens[index][1];

  if (!buttons.find(({ name }) => name === value)) return buttons[0].name;
  return value;
};

const Search = ({ location: { search }, history }) => {
  const [data, setData] = useState({ buttons: [] });
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

  const onSubmit = values => {
    let tokens = {};
    getTokens(search).forEach(([name, value]) => {
      tokens[name] = value;
    });
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
            <Form fields={data.fields}>
              <button type="submit">SAve</button>
            </Form>
          </FormContext.Provider>
        ) : (
          "bad"
        )}
      </div>
      {main()}
    </>
  );
};

export default Search;
