import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  getTokensObject,
  getTokensArray,
  createQueryFromArray
} from "../../utils/query";

const normalizeCurrentPage = (currentPage, pages) => {
  if (Number.isNaN(currentPage) || currentPage <= 1) return 1;
  if (currentPage >= pages) return pages;
  return currentPage;
};

const Buttons = ({ pages, location: { search, pathname } }) => {
  if (typeof pages !== "number" || pages <= 1) return null;

  const currentPage = normalizeCurrentPage(+getTokensObject(search).pageNumber);
  const buttons = [{ key: "first", value: 1 }];
  if (currentPage > 3) buttons.push({ key: "1...", value: "..." });
  if (currentPage > 2) buttons.push({ key: "prev", value: currentPage - 1 });
  if (currentPage > 1) buttons.push({ key: "current", value: currentPage });
  if (currentPage < pages - 1)
    buttons.push({ key: "next", value: currentPage + 1 });
  if (currentPage < pages - 2) buttons.push({ key: "2...", value: "..." });
  if (currentPage < pages) buttons.push({ key: "last", value: pages });
  const query = createQueryFromArray(
    getTokensArray(search).filter(([name]) => name != "pageNumber")
  );
  return buttons.map(({ key, value }) => {
    return typeof value === "number" ? (
      <Link
        key={key}
        to={pathname + query + "&pageNumber=" + value}
        style={{ fontWeight: value === currentPage ? "bold" : "normal" }}
      >
        {value}
      </Link>
    ) : (
      <React.Fragment key={key}>{value}</React.Fragment>
    );
  });
};

export default withRouter(Buttons);
