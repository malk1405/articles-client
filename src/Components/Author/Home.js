import React, { useState } from "react";
import useForm from "../../hooks/useForm";
import useAxios from "../../hooks/useAxios";

const Home = ({ user, login }) => {
  const [errorText, setErrorText] = useState("");

  const { setData, setIsFetching } = useAxios({
    url: `/api/authors/${user._id}`,
    method: "put",
    onSuccess: ({ data: fetchedUser }) => {
      login(fetchedUser);
    },
    onFailure: setErrorText
  });

  const { values, handleChange, handleSubmit, handleReset } = useForm({
    initialValue: { ...user },
    submit: () => {
      setData({ ...values });
      setIsFetching(true);
    }
  });

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
