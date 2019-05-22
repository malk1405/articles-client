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
  const page = tokens.find(([name]) => name === "page");
  if (!page || !buttons[page[1]]) return Object.keys(buttons)[0];
  return page[1];
};

const getInitLimit = search => {
  let tokens = getTokensObject(search);
  return tokens.limit || limits[0];
};

const Search = ({ location: { search }, history }) => {
  const [data, setData] = useState();
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
      .filter(([, value]) => value);
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

  const pageName = data
    ? getPageName(getTokensArray(search), data.buttons)
    : "";

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
      .filter(([, value]) => value);
    history.push(createQueryFromArray(tokens));
  };

  const getPageNumber = number => (number ? Math.ceil(number / limit) : 1);

  if (typeof data !== "object") return null;
  return (
    <>
      <div>
        {typeof data.buttons !== "object"
          ? null
          : Object.keys(data.buttons).map(name => {
              const { title, number } = data.buttons[name];
              return (
                <button
                  key={name}
                  name={name}
                  style={{
                    backgroundColor: pageName === name ? "green" : "grey"
                  }}
                  onClick={handlePush}
                >
                  {title}
                  {typeof number === "number" ? ` ${number}` : null}
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
      <Buttons pages={getPageNumber(data.buttons[pageName].number)} />
      {main()}
    </>
  );
};

export default Search;
