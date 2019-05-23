const getTokens = query =>
  query
    .split(/\?|&/)
    .filter(el => el)
    .map(el => el.split(/=/));

const getParameters = query => {
  let result = {};
  getTokens(query).forEach(([name, value]) => {
    result[name] = value;
  });
  return result;
};

const createTokensFromParameters = parameters =>
  Object.keys(parameters)
    .map(el => [el, parameters[el]])
    .filter(([, value]) => value);

const createQueryFromTokens = tokens =>
  "?" + tokens.map(el => el.join("=")).join("&");

const createQueryFromParameters = parameters =>
  createQueryFromTokens(createTokensFromParameters(parameters));

const modifyQuery = (query, parameters) =>
  createQueryFromParameters({ ...getParameters(query), ...parameters });

export { getTokens };
export { getParameters };
export { createQueryFromTokens };
export { modifyQuery };
