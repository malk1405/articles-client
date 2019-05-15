import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/auth";
import FormHandler from "../../Containers/FormHandler/FormHandler";
import List from "./List";
import Form from "../Form/Form";

const Author = ({ location: { pathname } }) => {
  const { user, login } = useContext(AuthContext);
  const [state, setState] = useState({ list: true, url: `/api/${pathname}` });

  useEffect(() => {
    setState({
      list: !user || user._id !== pathname.split("/")[2],
      url: `/api/${pathname}`
    });
  }, [user, pathname]);

  const onSuccess = ({ data: user }) => {
    const { _id, name, lastname } = user;
    login({ _id, name, lastname });
  };

  return (
    <FormHandler
      loadingUrl={state.url}
      fetchingUrl={state.url}
      method="put"
      onSuccess={onSuccess}
    >
      {state.list ? (
        <List />
      ) : (
        <Form className="signup-form">
          <button type="submit" className="button">
            Сохранить изменения
          </button>
        </Form>
      )}
    </FormHandler>
  );
};

export default Author;
