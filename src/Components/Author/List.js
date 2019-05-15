import React, { useContext } from "react";
import { FormContext } from "../../Context/form";
import "./li.css";

const getDate = inp => {
  const date = new Date(inp);
  if (!date) return "";
  const getMonth = m => {
    switch (m) {
      case 0:
        return "января";
      case 1:
        return "февраля";
      case 2:
        return "марта";
      case 3:
        return "апреля";
      case 4:
        return "мая";
      case 5:
        return "июня";
      case 6:
        return "июля";
      case 7:
        return "августа";
      case 8:
        return "сентября";
      case 9:
        return "октября";
      case 10:
        return "ноября";
      default:
        return "декабря";
    }
  };

  return `${date.getDate()} ${getMonth(date.getMonth())} ${date.getFullYear()}`;
};

const List = () => {
  const { fields } = useContext(FormContext);
  if (!fields.length) return <p>Список авторов пуст</p>;
  return (
    <ul className="border">
      {fields
        .filter(({ value }) => value !== "")
        .map(({ name, title, value, type }) => {
          return (
            <li key={name}>
              {title || name}: {type === "date" ? getDate(value) : value}
            </li>
          );
        })}
    </ul>
  );
};

export default List;
