import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Context/auth";
import useAxios from "../../hooks/useAxios";
import "./newArticle.css";
import Backdrop from "../../Containers/Backdrop/Backdrop";
import { FormContext } from "../../Context/form";
import Form from "../Form/Form";

const url = `/api/authors/`;
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
  { name: "pages", type: "number", required: true, title: "Количество страниц" }
];

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

  const { setUrl, setIsFetching: setisGetting } = useAxios({
    onSuccess: ({ data }) => {
      setResAuthors(data);
    },
    onFailure: setErrorText
  });

  useEffect(
    () => {
      if (!isAdding) return;
      setUrl(url);
      setisGetting(true);
      return () => {
        setisGetting(false);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isAdding]
  );

  const handleSubmit = values => {
    setData({
      ...values,
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

  const handleAddNewAuthor = values => {
    setAuthors([...authors, { id: id + 1, ...values }]);
    setId(id + 1);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  const handleDeleteAuthor = ({ target: { name } }) => {
    const result = [...authors];
    const index = result.findIndex(({ id }) => {
      return id === +name;
    });
    if (index >= 0) {
      setAuthors(result.filter((el, i) => i !== index));
    }
  };

  const handleChangeAuthors = ({ values: { name = "", lastname = "" } }) => {
    setUrl(`${url}?name=${name}&lastname=${lastname}`);
    setisGetting(true);
  };
  const warning = authors.find(({ _id }) => !_id) ? (
    <span>Незарегистрированные авторы выделены курсивом</span>
  ) : null;
  const handleAddExistingAuthor = event => {
    const { id: authorId } = event.target;
    const index = resAuthors.findIndex(({ _id }) => _id === authorId);
    if (index >= 0) {
      const { _id, name, lastname } = resAuthors[index];
      setAuthors([...authors, { _id, name, lastname, id: id + 1 }]);
    }
    setIsAdding(false);
    setId(id + 1);
  };
  return (
    <>
      <div className="modal" style={{ display: isAdding ? "none" : "block" }}>
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
                    <button
                      name={id}
                      type="button"
                      className="delete_button"
                      onClick={handleDeleteAuthor}
                    >
                      -
                    </button>
                  </div>
                </React.Fragment>
              );
            })}
            <button
              className="signup-form__button"
              type="button"
              onClick={handleOpenNewAuthor}
            >
              Добавить автора
            </button>
            <button className="signup-form__button" type="submit">
              Сохранить
            </button>
            <button className="signup-form__button" type="reset">
              Отменить
            </button>
          </Form>
          {errorText !== "" ? <p>{errorText}</p> : null}
        </FormContext.Provider>
      </div>
      {isAdding ? (
        <Backdrop hide={handleCancel} className="transparent">
          <div className="modal">
            <FormContext.Provider
              value={{
                fields: newAuthorFields,
                onSubmit: handleAddNewAuthor,
                onChange: handleChangeAuthors
              }}
            >
              <div>
                <p style={{ margin: "1rem" }}>Автор {authors.length + 1} </p>
              </div>
              <Form className={"signup-form"} autoComplete="off">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button type="submit" className="add_button">
                    +
                  </button>
                  <button
                    type="button"
                    className="delete_button"
                    onClick={handleCancel}
                  >
                    -
                  </button>
                </div>
                <div>
                  <div className="author_list">
                    {resAuthors.length > 0 ? (
                      resAuthors.map(({ _id, name, lastname }) => {
                        return (
                          <p
                            key={_id}
                            id={_id}
                            onClick={handleAddExistingAuthor}
                          >
                            {name} {lastname}
                          </p>
                        );
                      })
                    ) : (
                      <p>Результатов не найдено</p>
                    )}
                  </div>
                </div>
              </Form>
            </FormContext.Provider>
          </div>
        </Backdrop>
      ) : null}
    </>
  );
};
export default NewArticle;
