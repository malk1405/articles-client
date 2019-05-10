import React, { useState, useEffect } from "react";
import Axios from "axios";
import useForm from "../../hooks/useForm";

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

  useEffect(
    () => {
      if (!isSubmitting) return () => {};
      const signal = Axios.CancelToken.source();
      const postUser = async () => {
        try {
          await Axios.put(`/api/authors/${values._id}`, {
            ...values
          });
          setIsSubmitting(false);
          props.login(values);
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
    <>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <label>
          Имя:{" "}
          <input
            name="name"
            value={values.name || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Фамилия:{" "}
          <input
            name="lastname"
            value={values.lastname || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Дата рождения:{" "}
          <input
            name="birthDate"
            value={values.birthDate || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:{" "}
          <input
            name="email"
            value={values.email || ""}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Сохранить</button>
        <button type="reset">Отменить</button>
      </form>
      {errorText !== "" ? <p>{errorText}</p> : null}
    </>
  );
};
export default Home;
