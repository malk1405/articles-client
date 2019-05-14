import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import Form from "../Form/Form";

const Signup = props => {
  const [errorText, setErrorText] = useState("");
  const [fields, setFields] = useState([]);

  const { setData, isFetching, setIsFetching } = useAxios({
    url: "/api/authors",
    method: "post",
    onSuccess: ({ data: { user } }) => {
      props.login(user);
    },
    onFailure: setErrorText
  });

  const { isFetching: isLoading } = useAxios({
    isFetching: true,
    url: "/api/auth/signup",
    onSuccess: ({ data }) => {
      setFields(data);
    },
    onFailure: setErrorText
  });

  const onSubmit = values => {
    setData(values);
    setIsFetching(true);
  };

  return (
    <div className="modal">
      {isLoading ? <p>Загрузка формы...</p> : null}
      {fields.length ? (
        <Form onSubmit={onSubmit} fields={fields} className="signup-form" />
      ) : (
        <p>Форма пуста</p>
      )}
      {isFetching ? <p>Отправка данных...</p> : null}
      {errorText !== "" ? <p>{errorText}</p> : null}
    </div>
  );
};

export default Signup;
