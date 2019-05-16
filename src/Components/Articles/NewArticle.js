import React, { useState, useContext, useEffect } from "react";
import useForm from "../../hooks/useForm";
import { AuthContext } from "../../Context/auth";
import useAxios from "../../hooks/useAxios";
import "./newArticle.css";

const url = `/api/authors/?search=`;

const NewArticle = ({ hide }) => {
  const { user: currentUser } = useContext(AuthContext);
  const [errorText, setErrorText] = useState("");
  const [id, setId] = useState(0);
  const [authors, setAuthors] = useState([{ id, ...currentUser }]);
  const [resAuthors, setResAuthors] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const { setData, setIsFetching } = useAxios({
    url: "/api/articles",
    method: "post",
    onSuccess: hide,
    onFailure: setErrorText
  });

  // const { setUrl, setIsFetching: setisGetting } = useAxios({
  //   onSuccess: ({ data }) => {
  //     setResAuthors(data);
  //   },
  //   onFailure: setErrorText
  // });

  const { values, handleChange, handleSubmit, handleReset } = useForm({
    submit: () => {
      setData({
        ...values,
        publicationDate: +values.publicationDate,
        pages: values.pages,
        authors
      });
      setIsFetching(true);
    }
  });

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleDelete = () => {
    setIsAdding(false);
  };

  // const deleteAuthor = ({ target: { htmlFor } }) => {
  //   const result = [...authors];
  //   const index = result.findIndex(({ id }) => {
  //     return id === +htmlFor;
  //   });
  //   if (index >= 0) {
  //     setAuthors(result.filter((el, i) => i !== index));
  //   }
  // };

  // const handleChangeAuthors = ({ target: { name, value } }) => {
  //   // const result = [...authors];
  //   // const index = result.findIndex(({ id }) => {
  //   //   return id === +name;
  //   // });
  //   // setisGetting(false);
  //   // setUrl(url + value);
  //   // setisGetting(true);
  //   // if (index >= 0) {
  //   //   result[index] = { ...result[index], value };
  //   //   setAuthors(result);
  //   // }
  // };

  // useEffect(() => {
  //   if (isVisible) {
  //   }

  //   return () => {
  //     setisGetting(false);
  //   };
  // }, [isVisible, authors]);

  return (
    <div className="modal">
      <form
        className="signup-form"
        onSubmit={handleSubmit}
        onReset={handleReset}
        autoComplete="off"
      >
        <label>Название: </label>
        <input
          name="title"
          value={values.title || ""}
          onChange={handleChange}
        />
        <label htmlFor="publicationDate">Год издания: </label>
        <input
          name="publicationDate"
          type="number"
          min="1900"
          max={new Date().getFullYear().toString()}
          required
          value={values.publicationDate || ""}
          onChange={handleChange}
        />
        <label htmlFor="pages">Количество страниц: </label>
        <input
          name="pages"
          type="number"
          required
          value={values.pages || ""}
          onChange={handleChange}
        />
        {authors.map(({ id, name, lastname }, index) => {
          return (
            <React.Fragment key={id}>
              <p> Автор {index + 1} </p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>
                  {name} {lastname}{" "}
                </p>
                <button type="button" onClick={handleDelete}>
                  -
                </button>
              </div>
            </React.Fragment>
          );
        })}
        {isAdding ? (
          <>
            <p>Автор {authors.length + 1}</p>
            <div
              style={{
                gridColumn: "2/-1",
                display: "grid",
                width: "100%",
                gridTemplateColumns: "auto min-content min-content"
              }}
            >
              <input style={{}} />
              <button type="button" onClick={handleDelete}>
                +
              </button>
              <button type="button" onClick={handleDelete}>
                -
              </button>
            </div>
          </>
        ) : (
          <button className="form_button" type="button" onClick={handleAdd}>
            Добавить автора
          </button>
        )}
        <button className="form_button" type="submit">
          Сохранить
        </button>
        <button className="form_button" type="reset">
          Отменить
        </button>
      </form>
      {errorText !== "" ? <p>{errorText}</p> : null}
    </div>
  );
};
export default NewArticle;
