import React from "react";
import { Link } from "react-router-dom";

const normalizeCurrentPage = (currentPage, pages) => {
  if (!currentPage || currentPage <= 1) return 1;
  return Math.min(currentPage, pages);
};

const Buttons = ({ pages, currentPage, url }) => {
  if (typeof pages !== "number" || pages <= 1) return null;
  const current = normalizeCurrentPage(currentPage, pages);
  const buttons = [{ key: "first", value: 1 }];
  if (current > 3) buttons.push({ key: "1...", value: "..." });
  if (current > 2) buttons.push({ key: "prev", value: current - 1 });
  if (current > 1) buttons.push({ key: "current", value: current });
  if (current < pages - 1) buttons.push({ key: "next", value: current + 1 });
  if (current < pages - 2) buttons.push({ key: "2...", value: "..." });
  if (current < pages) buttons.push({ key: "last", value: pages });
  return buttons.map(({ key, value }) => {
    return typeof value === "number" ? (
      <Link
        key={key}
        to={url + value}
        style={{ fontWeight: value === current ? "bold" : "normal" }}
      >
        {value}
      </Link>
    ) : (
      <React.Fragment key={key}>{value}</React.Fragment>
    );
  });
};

export default Buttons;
