import React, { useState, useContext, useEffect } from "react";
import useForm from "../../hooks/useForm";
import { AuthContext } from "../../Context/auth";
import useAxios from "../../hooks/useAxios";
import "./newArticle.css";
import Backdrop from "../../Containers/Backdrop/Backdrop";
import { FormContext } from "../../Context/form";
import Form from "../Form/Form";

const url = `/api/authors/?search=`;
const newAuthorFields = [
  { name: "name", required: true, title: "Имя" },
  { name: "name", required: true, title: "Фамилия" }
];
const articleFields = [
  { name: "title", required: true, title: "Название" },
  {
    name: "publicationDate",
    type: "number",
    required: true,
    title: "Дата публикации"
  },
  { name: "pages", type: "number", title: "Количество страниц" }
];

const NewArticle = ({ hide }) => {
  const { user: currentUser } = useContext(AuthContext);
  const [errorText, setErrorText] = useState("");
  const [id, setId] = useState(0);
  const [authors, setAuthors] = useState([{ id, ...currentUser }]);
  const [newAuthor, setNewAuthor] = useState({});
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

  const handleSubmit = values => {
    setData({
      ...values,
      publicationDate: +values.publicationDate,
      pages: values.pages,
      authors: authors.map(({ id, _id: authorId, ...el }) => ({
        authorId,
        ...el
      }))
    });
    setIsFetching(true);
  };

  const handleAddNewAuthor = () => {
    setIsAdding(true);
  };
  const handleCancel = () => {
    setIsAdding(false);
  };

  const handleDeleteAuthor = () => {};

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

  return (
    <Backdrop hide={handleCancel}>
      <div className="modal">
        {isAdding ? (
          <FormContext.Provider value={{ fields: newAuthorFields }}>
            <p>Автор {authors.length + 1}:</p>
            <Form className={"signup-form"}>
              <button type="submit" className="form_button">
                Добавить
              </button>
              <button
                type="button"
                className="form_button"
                onClick={handleCancel}
              >
                Отменить
              </button>
            </Form>
          </FormContext.Provider>
        ) : (
          <FormContext.Provider
            value={{ fields: articleFields, onSubmit: handleSubmit }}
          >
            <Form className="signup-form" autoComplete="off">
              {authors.map(({ id, name, lastname }, index) => {
                return (
                  <React.Fragment key={id}>
                    <label> Автор {index + 1}: </label>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <span>
                        {name} {lastname}{" "}
                      </span>
                      <button
                        name={id}
                        type="button"
                        onClick={handleDeleteAuthor}
                      >
                        -
                      </button>
                    </div>
                  </React.Fragment>
                );
              })}
              <button
                className="form_button"
                type="button"
                onClick={handleAddNewAuthor}
              >
                Добавить автора
              </button>
              <button className="form_button" type="submit">
                Сохранить
              </button>
              <button className="form_button" type="reset">
                Отменить
              </button>
            </Form>
            {errorText !== "" ? <p>{errorText}</p> : null}
          </FormContext.Provider>
        )}
      </div>
    </Backdrop>
  );
};
export default NewArticle;
