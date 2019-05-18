const Query = {
  getTokens: query =>
    query
      .split(/\?|&/)
      .filter(el => el)
      .map(el => el.split(/=/)),
  createQuery: tokens => "?" + tokens.map(el => el.join("=")).join("&")
};

export const getTokens = Query.getTokens;
export const createQuery = Query.createQuery;
