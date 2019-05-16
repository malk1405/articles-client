import React, { useState, useContext } from "react";
import useForm from "../../hooks/useForm";
import { AuthContext } from "../../Context/auth";
import useAxios from "../../hooks/useAxios";
import "./newArticle.css";

const Home = ({ hide }) => {
  const context = useContext(AuthContext);
  const [errorText, setErrorText] = useState("");
  const [authors, setAuthors] = useState([]);
  const [id, setId] = useState(0);
  const { setData, setIsFetching } = useAxios({
    url: "/api/articles",
    method: "post",
    onSuccess: hide,
    onFailure: setErrorText
  });

  const { values, handleChange, handleSubmit, handleReset } = useForm({
    submit: () => {
      const { _id: authorId, name, lastname } = context.user;
      setData({
        ...values,
        publicationDate: +values.publicationDate,
        pages: values.pages,
        authors: [
          { authorId, name, lastname },
          ...authors.map(({ value }) => ({ lastname: value, name: "Vitalina" }))
        ]
      });
      setIsFetching(true);
    }
  });
  const addAuthor = () => {
    setAuthors([...authors, { id, value: "" }]);
    setId(id + 1);
  };

  const deleteAuthor = ({ target: { htmlFor } }) => {
    const result = [...authors];
    const index = result.findIndex(({ id }) => {
      return id === +htmlFor;
    });
    if (index >= 0) {
      setAuthors(result.filter((el, i) => i !== index));
    }
  };

  const handleChangeAuthors = ({ target: { name, value } }) => {
    const result = [...authors];
    const index = result.findIndex(({ id }) => {
      return id === +name;
    });
    if (index >= 0) {
      result[index] = { ...result[index], value };
      setAuthors(result);
    }
  };
  return (
    <div className="modal">
      <form
        className="signup-form"
        onSubmit={handleSubmit}
        onReset={handleReset}
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
        {authors.map((el, index) => {
          return (
            <React.Fragment key={el.id}>
              <label htmlFor={el.id} onClick={deleteAuthor}>
                Соавтор {index + 1}
              </label>
              <input
                name={el.id}
                value={el.value}
                onChange={handleChangeAuthors}
              />
            </React.Fragment>
          );
        })}
        <button type="button" onClick={addAuthor}>
          Добавить соавтора
        </button>
        <button type="submit">Сохранить</button>
        <button type="reset">Отменить</button>
      </form>
      {errorText !== "" ? <p>{errorText}</p> : null}
    </div>
  );
};
export default Home;
