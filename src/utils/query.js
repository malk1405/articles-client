const getTokensArray = query =>
  query
    .split(/\?|&/)
    .filter(el => el)
    .map(el => el.split(/=/));

const createQueryFromArray = tokens =>
  "?" + tokens.map(el => el.join("=")).join("&");

const getTokensObject = query => {
  let result = {};
  getTokensArray(query).forEach(([name, value]) => {
    result[name] = value;
  });
  return result;
};

export { getTokensArray };
export { getTokensObject };
export { createQueryFromArray };
