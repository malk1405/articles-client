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
  { name: "lastname", required: true, title: "Фамилия" }
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

  const handleOpenNewAuthor = () => {
    setIsAdding(true);
  };

  const handleChange = ({ changedValue, values }) => {
    setNewAuthor(values);
  };

  const handleAddNewAuthor = values => {
    console.log("submit new author", values);
    setAuthors([...authors, values]);
    setIsAdding(false);
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
  const warning = authors.find(({ _id }) => !_id) ? (
    <span>Незарегистрированные авторы выделены курсивом</span>
  ) : null;
  return isAdding ? (
    <Backdrop hide={handleCancel}>
      <div className="modal">
        <FormContext.Provider
          value={{ fields: newAuthorFields, onSubmit: handleAddNewAuthor }}
        >
          <div>
            <p style={{ margin: "1rem" }}>Автор {authors.length + 1} </p>
          </div>
          <Form className={"signup-form"}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <button
                type="submit"
                style={{
                  backgroundColor: "green",
                  borderRadius: "50%",
                  border: "none",
                  color: "white",
                  height: "2rem",
                  width: "2rem",
                  padding: "0"
                }}
              >
                +
              </button>
              <button
                type="button"
                style={{
                  backgroundColor: "#c95991",
                  borderRadius: "50%",
                  border: "none",
                  color: "white",
                  height: "2rem",
                  width: "2rem",
                  padding: "0"
                }}
                onClick={handleCancel}
              >
                -
              </button>
            </div>
          </Form>
        </FormContext.Provider>
      </div>
    </Backdrop>
  ) : (
    <div className="modal">
      {warning}
      <FormContext.Provider
        value={{ fields: articleFields, onSubmit: handleSubmit }}
      >
        <Form className="signup-form" autoComplete="off">
          {authors.map(({ id, name, lastname, _id }, index) => {
            return (
              <React.Fragment key={id}>
                <label> Автор {index + 1}: </label>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <span style={{ fontStyle: _id ? "normal" : "italic" }}>
                    {name} {lastname}
                  </span>
                  <button name={id} type="button" onClick={handleDeleteAuthor}>
                    -
                  </button>
                </div>
              </React.Fragment>
            );
          })}
          <button
            className="form_button"
            type="button"
            onClick={handleOpenNewAuthor}
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
    </div>
  );
};
export default NewArticle;
