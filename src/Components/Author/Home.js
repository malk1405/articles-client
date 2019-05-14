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
        <ul>
          <li>
            <label>
              Фамилия:{" "}
              <input
                name="lastname"
                value={values.lastname || ""}
                onChange={handleChange}
              />
            </label>
          </li>

          <li>
            <label>
              Имя:{" "}
              <input
                name="name"
                value={values.name || ""}
                onChange={handleChange}
              />
            </label>
          </li>
          <li>
            <label>
              Отчество:{" "}
              <input
                name="patronym"
                value={values.patronym || ""}
                onChange={handleChange}
              />
            </label>
          </li>
          <li>
            <label>
              Дата рождения:{" "}
              <input
                name="birthDate"
                value={values.birthDate || ""}
                onChange={handleChange}
              />
            </label>
          </li>
          <li>
            <label>
              Email:{" "}
              <input
                name="email"
                value={values.email || ""}
                onChange={handleChange}
              />
            </label>
          </li>
          <li>
            <label>
              Телефон:{" "}
              <input
                name="tel"
                value={values.tel || ""}
                onChange={handleChange}
              />
            </label>
          </li>
          <li>
            <label>
              Должность:{" "}
              <input
                name="post"
                value={values.post || ""}
                onChange={handleChange}
              />
            </label>
          </li>
          <li>
            <label>
              Академичексая степень:{" "}
              <input
                name="acDeg"
                value={values.acDeg || ""}
                onChange={handleChange}
              />
            </label>
          </li>
          <li>
            <label>
              Доля ставки:{" "}
              <input
                name="salary"
                value={values.salary || ""}
                onChange={handleChange}
              />
            </label>
          </li>
        </ul>

        <button type="submit">Сохранить</button>
        <button type="reset">Отменить</button>
      </form>
      {errorText !== "" ? <p>{errorText}</p> : null}
    </>
  );
};
export default Home;
