import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import useForm from "../../hooks/useForm";
import { AuthContext } from "../../Context/auth";

const Home = props => {
  const [errorText, setErrorText] = useState("");
  const {
    values,
    handleChange,
    handleSubmit,
    handleReset,
    isSubmitting,
    setIsSubmitting
  } = useForm({
    initialValue: { ...props.user }
  });
  const context = useContext(AuthContext);
  useEffect(
    () => {
      if (!isSubmitting) return () => {};
      const signal = Axios.CancelToken.source();
      const postUser = async () => {
        try {
          const { _id: authorId, name, lastname } = context.user;
          await Axios.post(
            `/api/articles/`,
            {
              ...values,
              publicationDate: +values.publicationDate,
              authors: { authorId, name, lastname }
            },
            { cancelToken: signal.token }
          );
          setIsSubmitting(false);
          props.hide();
        } catch (err) {
          if (Axios.isCancel(err)) {
          } else {
            setErrorText(err.response.data.message);
            setIsSubmitting(false);
          }
        }
      };
      postUser();
      return () => {
        signal.cancel("Api is being cancelled");
      };
    },
    // eslint-disable-next-line
    [isSubmitting]
  );

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
