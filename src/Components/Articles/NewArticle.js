import React, { useState, useContext } from "react";
import useForm from "../../hooks/useForm";
import { AuthContext } from "../../Context/auth";
import useAxios from "../../hooks/useAxios";

const Home = ({ hide }) => {
  const context = useContext(AuthContext);
  const [errorText, setErrorText] = useState("");
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
        authors: { authorId, name, lastname }
      });
      setIsFetching(true);
    }
  });

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <label>
          Название:{" "}
          <input
            name="title"
            value={values.title || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Год издания:{" "}
          <input
            name="publicationDate"
            type="number"
            min="1900"
            max={new Date().getFullYear().toString()}
            required
            value={values.publicationDate || ""}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Сохранить</button>
        <button type="reset">Отменить</button>
      </form>
      {errorText !== "" ? <p>{errorText}</p> : null}
    </div>
  );
};
export default Home;
